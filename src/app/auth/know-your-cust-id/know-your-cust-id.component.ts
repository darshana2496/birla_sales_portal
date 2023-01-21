import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-know-your-cust-id',
  templateUrl: './know-your-cust-id.component.html',
  styleUrls: ['./know-your-cust-id.component.scss'],
})
export class KnowYourCustIdPage implements OnInit {
 
  submitted: boolean = false;
  custIds: string;
  showCustIdModal: boolean = false;
  success: boolean;
  presentingElement = null;
  errorMsg: string = '';
  knowCustIdForm: FormGroup;
  selectedDate:any;
  constructor(public globalService: GlobalService, public router: Router, public fb: FormBuilder) {
    // this.globalService.currentActivePageReference = this;
    this.knowCustIdForm = this.fb.group({
      dob: new FormControl('', [Validators.required]),
      panNo: new FormControl('', [Validators.required])
    })
   }

  ngOnInit() {
  }
  onTermsChanged(event: Event) {
    if(this.selectedDate != undefined){
      
      let startDate = formatDate(this.selectedDate,"dd-MM-yyyy",'en-US');
  console.log(this.selectedDate,"Selected",startDate)
  this.knowCustIdForm.controls['dob'].setValue(startDate)    
    }
  else{
  
  }
  
    }
  public get f() {
    return this.knowCustIdForm.controls;
  }

  
  submitCustId() {
    this.submitted = true;
    if (this.knowCustIdForm.valid) {
      let formValues = this.knowCustIdForm.value;
        let str = (formValues.dob.toString()).split('-');
        let dobStr = str[2] + str[1] + str[0];
        let obj = {
            "panno": formValues.panNo,
            "dob": dobStr
        }
        this.globalService.getCustomerId(obj).then((data: any) => {
            this.showCustIdModal = true;
            if (data.btIsSuccess) {
                this.success = true;
                let idsStr = '';
                if (data.object.length > 1) {
                    for (var i = 0; i < data.object.length; i++) {
                        if (i != data.object.length - 1) {
                            idsStr = data.object[i].CustomerCode + ',' + idsStr
                        } else {
                            idsStr = idsStr + data.object[i].CustomerCode;
                        }
                    }
                } else {
                    idsStr = data.object[0].CustomerCode;
                }
                this.custIds = idsStr;
            } else {
                this.success = false;
                this.errorMsg = data.vcDescription;
            }
        }).catch((data: any) => {
          console.log(data);
        });
    } else {
      this.knowCustIdForm.markAllAsTouched()
    }

  }

  tryAgain() {
      this.success = false;
      this.custIds = '';
      this.submitted = false;
      this.showCustIdModal = false;
      this.knowCustIdForm.reset()
  }

  backToLogin() {
      this.router.navigate(['loginwithcustid'])
  }

}

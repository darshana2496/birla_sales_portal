import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-cheque-detail-drop',
  templateUrl: './cheque-detail-drop.component.html',
  styleUrls: ['./cheque-detail-drop.component.scss'],
})
export class ChequeDetailDropComponent implements OnInit {
  myform: FormGroup;
  dropLocationList: any = [];
  dateModal: boolean = false;
  selectedDate: any;
  canDismiss = false;
  presentingElement = null;

  isSelected = true;
  constructor(public globalService: GlobalService, public fb: FormBuilder) {
    this.myform = fb.group({
      location: fb.control('', [Validators.required]),
      date: fb.control('', [Validators.required]),
      chequeNo: fb.control('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit() {
    this.globalService
      .getChequeDropLocation()
      .then((response: any) => {
        if (response.btIsSuccess) {
          this.dropLocationList = response.object;
          this.setDropLoc();
        } else {
          this.dropLocationList = [];
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  onTermsChanged(event: Event) {
    if (this.selectedDate != undefined) {
      let startDate = formatDate(this.selectedDate, 'dd-MM-yyyy', 'en-US');
      this.myform.controls['date'].setValue(startDate);
      this.canDismiss = true;
    } else {
      this.canDismiss = false;
    }
  }
  setDropLoc() {
    let dropLocation = this.dropLocationList[0].intLocationID;
    this.myform.controls['location'].setValue(dropLocation);
  }
  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  get f() {
    return this.myform.controls;
  }
  validationErrorMsg() {
    let chequeObj = {
      vcCustomerID: this.globalService.customerId,
      vcChequeNo: this.myform.get('chequeNo').value,
      intOfficeID: this.myform.get('location').value,
      vcDate: this.myform.get('date').value,
      vcLastUpdatedIP: this.globalService.deviceIP,
    };
    this.globalService
      .dropChequeLocations(chequeObj)
      .then((response: any) => {
        if (response.btIsSuccess) {
          this.globalService.universalAlert(
            'Succesfull',
            response.vcDescription,
            'Ok'
          );
          this.myform.reset();
        } else {
        }
      })
      .catch((response: any) => {
        console.log(response, 'response error');
      });
  }
}

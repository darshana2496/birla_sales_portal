import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-cheque-detail-drop',
  templateUrl: './cheque-detail-drop.component.html',
  styleUrls: ['./cheque-detail-drop.component.scss'],
})
export class ChequeDetailDropComponent implements OnInit {
  myform: FormGroup;
  dropLocationList: any = [];
  dateModal:boolean=false;
  selectedDate:any;
  canDismiss = false;
  presentingElement = null;
  obj:ResDataType;
  isSelected=true;
  constructor(public globalService:GlobalService,public fb:FormBuilder) {
    this.myform = fb.group({
      location: fb.control("", [Validators.required]),
      date:fb.control("", [Validators.required]),
      chequeNo: fb.control("", [
        Validators.required,
        Validators.minLength(1)
      ])
    });
   }

  ngOnInit() {
    this.obj=new ResDataType();
    console.log(this.f['date'].errors['required'],'error reading');
    
    this.globalService
    .getChequeDropLocation()
    .then((response: any) => {
      console.log(response);
      if (response.btIsSuccess) {
        this.dropLocationList = response.object;
        this.setDropLoc();
      } else {
        this.dropLocationList = [];
      }
      console.log(this.dropLocationList);
    })
    .catch(response => {
      console.log(response);
    });
  }
   onTermsChanged(event: Event) {
  if(this.selectedDate != undefined){
    
    let startDate = formatDate(this.selectedDate,"dd-MM-yyyy",'en-US');
console.log(this.selectedDate,"Selected",startDate)
this.myform.controls['date'].setValue(startDate)
this.canDismiss=true
  
  }
else{
  this.canDismiss=false;
}

  }
  setDropLoc() {
    let dropLocation = this.dropLocationList[0].intLocationID;
    this.myform.controls["location"].setValue(dropLocation);
  }
  get f() {
    return this.myform.controls;
  }
  validationErrorMsg(){
    let chequeObj = {
      "vcCustomerID": this.globalService.customerId,
      "vcChequeNo": this.myform.get('chequeNo').value,
      "intOfficeID": this.myform.get('location').value,
      "vcDate": this.myform.get('date').value,
      "vcLastUpdatedIP": this.globalService.deviceIP,
    }
    var data;
    console.log(chequeObj,'Check obj')
    this.globalService.dropChequeLocations(chequeObj).then((response: any) => {
      if (response.btIsSuccess) {

        this.globalService.universalAlert("Succesfull",response.vcDescription, "Ok");
    this.myform.reset()
      }
       else {
      //  data= {
      //     "flag": false,
      //     "data": response.vcDescription
      //   }
      //   this.obj=data
      }
    }).catch((response: any) => {
      console.log(response,'response error')
    })
    console.log(this.obj,'data value check')

    // if (data.flag) {
    //   this.myform.reset();
    // } else {
    // }
 
  }
  showModal(){
    this.dateModal=true
    console.log(this.selectedDate,'Selected Date')
  }
  // showDate(): void {
  //   this.datepicker
  //     .show({
  //       date: new Date(),
  //       mode: "date",
  //       androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_DARK
  //     })
  //     .then(
  //       date => {
  //         let startDate = moment(date).format("DD-MM-YYYY");
  //         this.myform.controls["date"].setValue(startDate);
  //       },
  //       err => {
  //         console.log("Error occurred while getting date: ", err);
  //       }
  //     );
  // }
}
export class ResDataType{
  public flag:boolean;
  public data:string;
}



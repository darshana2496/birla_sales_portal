import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-feedback-query',
  templateUrl: './feedback-query.component.html',
  styleUrls: ['./feedback-query.component.scss'],
})
export class FeedbackQueryComponent implements OnInit {
  CustomerSegment: string = "myFeedback";
  serverError: boolean = false;
  myform: FormGroup;
  enable: boolean = false;
  myaddedFeedbacks: any = [];
  constructor(public fb:FormBuilder,public globalService: GlobalService) {
    this.myform = fb.group({
      query:fb.control("121"),
      feedback:fb.control('')
    });
    this.myform.valueChanges.subscribe(values => {
      console.log(values)
      if (!values.feedback.length) {
        this.enable = false;
      } else {
        this.enable = true;
      }
    });
   }

  ngOnInit() {
    this.getAddedFeedbackList();
  
  }
  segmentChanged(segment: any) {
    console.log(segment.value);
    if (segment.value == "myFeedback") {
      this.getAddedFeedbackList();
    }
  }
  // createForm() {
    

  //   this.onChanges();
  // }
  // onChanges() {
   
  // }
  clearFilter(): void {
    this.myform.controls['query'].setValue("121");
    this.myform.controls['feedback'].setValue("");
    this.enable = false;
  }
  onSubmit() {
    let obj = {
      "vcCustomerID": this.globalService.customerId,
      "vcType": this.myform.get('query').value,
      "vcQuery": this.myform.get('feedback').value,
    }
    console.log(obj);

    this.globalService.raiseFeedback(obj).then((response: any) => {
      console.log(response)
      if (response.btIsSuccess) {
        this.globalService.universalAlert("", response.vcDescription, "ok");
        this.clearFilter();
      } else {
        this.globalService.universalAlert("", response.vcDescription, "ok");
      }
    }).catch((response: any) => {
    });
  }
  getAddedFeedbackList() {
    this.globalService.getAllRaisedFeedback().then((response: any) => {
      console.log(response);
      if (response.btIsSuccess) {
        if (response.object.length) {
          this.myaddedFeedbacks = response.object;
        }
        else {
          this.myaddedFeedbacks = [];
        }
      }
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { GlobalService } from 'src/app/services/global.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss'],
})
export class SelectCustomerComponent implements OnInit {
  sampleData = [];
  port: any;
  btndisabled = false;
  userDetail: any;
  userName: any;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  constructor(
    public storage: Storage,
    public globalService: GlobalService,
    public fb: FormBuilder,
    public router: Router
  ) {
    // this.selForm=fb.group({
    //   idValue:fb.control('',Validators.required)
    // })
  }

  ngOnInit() {
    // this.sampleData=[
    //   {"name":"NewYork","id":1},
    //   {"name":"USA","id":2},
    //   {"name":"London","id":3}
    // ]
    this.storage.get('ProjectCustomerLogDetail').then((x: any) => {
      console.log(x, 'storage check');
      this.userDetail = x;
      this.userName = x.name;
      console.log(this.userDetail, 'storage');
      this.getListdata();
    });
  }
  getListdata() {
    this.globalService
      .getCustomerlist(this.userDetail.member_id)
      .then((x: any) => {
        if (x.btIsSuccess) {
          this.sampleData = x.object;
          console.log(this.sampleData);
        }
      })
      .catch((err) => {});
  }
  clear() {
    this.portComponent.clear();
    this.portComponent.close();
  }

  confirm() {
    this.portComponent.confirm();
    this.portComponent.close();
    this.btndisabled = true;
  }
  portChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log('port:', event.value);
  }
  fnSubmit() {
    console.log('Value', this.port);
    this.globalService.customerId = this.port.customerCode;
    this.storage.set('ProjectCustomerId', this.port.customerCode);
    console.log(this.globalService.customerId, 'cutomer id');
    this.router.navigate(['/dashboard']);
    this.storage.set('selectedProjectDetail', this.port);
    const projdetail = {
      customerProjectId: this.port.customerCode,
      customerName: this.port.customerName,
      projectImage: '',
      projectName: this.port.projectName,
      userName: this.port.rmName,
    };
    console.log(projdetail, 'check');
    this.globalService.selectedProjectObj = projdetail;
  }
  filterPorts(ports: any[], text: string) {
    return ports.filter((port) => {
      return (
        port.customerName.trim().toLowerCase().match(text.trim())
      );
    });
  }
  searchPorts(event: { component: IonicSelectableComponent; text: string }) {
    event.component.items=this.sampleData;
   
    let portName = event.text.trim().toLowerCase();;
    if(portName.length > 2){
      event.component.startSearch();
      event.component.items=this.filterPorts(this.sampleData,portName)
    }
    else if(portName.length < 2) {
      event.component.endSearch();
    }
    else{
      event.component.endSearch();
    }
    event.component.endSearch();
  }
}

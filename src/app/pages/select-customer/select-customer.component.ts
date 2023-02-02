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
  pageNumber = 1;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  constructor(
    public storage: Storage,
    public globalService: GlobalService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    this.storage.get('ProjectCustomerLogDetail').then((x: any) => {
      this.userDetail = x;
      this.userName = x.name;
      this.getListdata();
    });
  }
  getListdata() {
    this.globalService
      .getCustomerlist(this.userDetail.member_id, this.pageNumber)
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
    // console.log('Value', this.port);
    this.globalService.customerId = this.port.customerCode.toString();
    this.storage.set('ProjectCustomerId', this.port.customerCode.toString());
    // console.log(this.globalService.customerId, 'cutomer id');
    this.router.navigate(['/dashboard']);
    this.storage.set('selectedProjectDetail', this.port);
    const projdetail = {
      customerProjectId: this.port.customerCode.toString(),
      customerName: this.port.customerName,
      projectImage: '',
      projectName: this.port.projectName,
      userName: this.port.rmName,
    };
    // console.log(projdetail, 'check');
    this.globalService.selectedProjectObj = projdetail;
  }

  searchPorts(event: { component: IonicSelectableComponent; text: string }) {
    let portName = event.text;
    // event.component.startSearch();
    // console.log('search text', portName);

    // Assume that we already have some PortService that return ports
    // filtered by name from our server.
    // this.portService.getPorts(portName).subscribe(ports => {
    //   event.component.items = ports;

    //   // Get ports from a storage and stop searching.
    //   event.component.endSearch();
    // });
  }

  getMoreCustomer(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    this.pageNumber++;
    this.globalService
      .getCustomerlist(this.userDetail.member_id, this.pageNumber)
      .then((x: any) => {
        if (x.btIsSuccess) {
          this.sampleData = event.component.items.concat(x.object);
          event.component.items = this.sampleData;
          event.component.endInfiniteScroll();
        }
      })
      .catch((err) => {});
  }
}

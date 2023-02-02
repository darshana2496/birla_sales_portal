import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss'],
})
export class SelectCustomerComponent implements OnInit {
  sampleData = [];
  port: any;
  btndisabled = false;
  // modaldesign={
  //   "--height": "50%",
  //   "--border-radius":"16px",
  //   "--box-shadow":"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"

  // }
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  constructor(
    public globalService: GlobalService,
    public fb: FormBuilder,
    public router: Router
  ) {
    // this.selForm=fb.group({
    //   idValue:fb.control('',Validators.required)
    // })
  }

  ngOnInit() {
    this.sampleData = [
      { name: 'NewYork', id: 1 },
      { name: 'USA', id: 2 },
      { name: 'London', id: 3 },
    ];
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
    this.globalService
      .selectCustomer(this.port)
      .then((x) => {})
      .catch((x) => {});
  }

  searchPorts(event: { component: IonicSelectableComponent; text: string }) {
    let portName = event.text;
    event.component.startSearch();
    console.log('search text', portName);

    // Assume that we already have some PortService that return ports
    // filtered by name from our server.
    // this.portService.getPorts(portName).subscribe(ports => {
    //   event.component.items = ports;

    //   // Get ports from a storage and stop searching.
    //   event.component.endSearch();
    // });
  }
}

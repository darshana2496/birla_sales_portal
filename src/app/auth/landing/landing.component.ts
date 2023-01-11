import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingPage implements OnInit {

  constructor(public storage: Storage,public router: Router) { }

  ngOnInit() {
  }

  gotoCustIdPage() {
    this.storage.set("FirstTimeAppLoad", false);
    this.router.navigate(['know-your-cust-id'])
  }

}

import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-term-n-condition',
  templateUrl: './term-n-condition.page.html',
  styleUrls: ['./term-n-condition.page.scss'],
})
export class TermNConditionPage implements OnInit {
  terms: string;
  constructor(public global:GlobalService) { }

  ngOnInit() {
   
  }

}

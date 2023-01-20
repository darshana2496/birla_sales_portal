import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-cheque-drop',
  templateUrl: './cheque-drop.component.html',
  styleUrls: ['./cheque-drop.component.scss'],
})
export class ChequeDropComponent implements OnInit {
  dropLocationList: any = [];
  serverResponseMsg: string;
  constructor( public globalService: GlobalService) { }

  ngOnInit() 
  {
    this.globalService
      .getCheckDropLocations()
      .then((response: any) => {
        console.log(response);
        if (response.btIsSuccess) {
          let obj = response.object;
          this.dropLocationList = obj;
        } else {
          this.serverResponseMsg = response.vcDescription;
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  }
  share(data) {
    console.log(data);
    let obj =
      "Location: " + data.vcLocation + ". Description: " + data.vcDescription;
    Share.share({
      title:'Office Detail',
      text:obj,
      
    }
        
        )
     
  }
}

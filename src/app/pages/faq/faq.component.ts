import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  TotalFaqList: any = [];
  constructor(public globalService: GlobalService) { }

  ngOnInit() {
    this.getFAQs();
   
  }
  getFAQs(): void {
    this.globalService.getFAQ().then((response: any) => {
      console.log(response);
      if (response.btIsSuccess) {
        let obj = response.object;
        var TotalFaqList = [];
        for (let i = 0; i < obj.length; i++) {
          const element = obj[i];
          for (let j = 0; j < element.faqLists.length; j++) {
            const elementList = element.faqLists[j];
            TotalFaqList.push(elementList);
          }
        }
        this.TotalFaqList = TotalFaqList;
        console.log(this.TotalFaqList);
      } else {
        this.TotalFaqList = [];
      }
    }).catch((response: any) => {
      console.log(response);
    })
  }

  accordian($elem) {

    if ($elem.composedPath()[1].className == "active") {
      $elem.composedPath()[1].classList.remove("active")
    } else {
      var elem = $elem.composedPath()[3];
      console.log(elem,'elem check',elem.children.length,)
      for (var i = 0; i < elem.children.length; i++) {
        if (elem.children[i].className == "active") {
          elem.children[i].classList.remove('active');
        }
      }
      $elem.composedPath()[1].classList.add("active")
    }
  }

}

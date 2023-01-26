import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-added-project-success',
  templateUrl: './added-project-success.component.html',
  styleUrls: ['./added-project-success.component.scss'],
})
export class AddedProjectSuccessComponent implements OnInit {
@Input() values :any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.values,'Value Check')
  }
  async close(){
    const modal = await this.modalCtrl.getTop();
    modal.dismiss()
  }
}

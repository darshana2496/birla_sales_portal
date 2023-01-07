import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  projectList: any[];
  customerId: number;
  activeSlideIndicator: number;
  selectedProjectObj: any;
  constructor(public _http: HttpClient, public storage: Storage) {}
  getTermOfUse() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(`${environment.serverUrl}config/getConfigData/UseTerm`)
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  sanitizeHtml(rawHtml: any) {
    var txt = document.createElement('textarea');
    txt.innerHTML = rawHtml;
    return txt.value;
  }

  async setInitialProject() {
    let promise = new Promise((resolve, reject) => {
      this.storage
        .get('ProjectList')
        .then((data) => {
          console.log(data);
          if (data == null) {
            //first time load
            this.projectList = [];
            this.customerId = 0;
          } else {
            this.projectList = data;
            this.storage.get('ProjectCustomerId').then((response: any) => {
              this.customerId = response;
              for (let q = 0; q < data.length; q++) {
                if (data[q].customerProjectId == response) {
                  this.activeSlideIndicator = q;
                  this.selectedProjectObj = data[q];
                }
              }
            });
          }

          console.log('this.globalService.projectList', this.projectList);
          console.log('this.globalService.customerId', this.customerId);
          console.log(
            'this.globalService.selectedProjectObj',
            this.selectedProjectObj
          );
          resolve(true);
        })
        .catch(() => {});

      // this.checkAppReview();
    });
    return promise;
  }
}

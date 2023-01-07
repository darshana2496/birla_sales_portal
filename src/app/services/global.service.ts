import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
urls=environment.serverUrl;
  constructor( public _http: HttpClient,) { }
  getTermOfUse() {
    let promise = new Promise((resolve, reject) => {
        this._http
            .get(`${this.urls}config/getConfigData/UseTerm`)
            .toPromise()
            .then(response => {

                resolve(response);
            });
    });
    return promise;
}
sanitizeHtml(rawHtml: any) {
  var txt = document.createElement("textarea");
  txt.innerHTML = rawHtml;
  return txt.value;
}
}

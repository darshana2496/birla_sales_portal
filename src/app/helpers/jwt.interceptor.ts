import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(public globalService: GlobalService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let fromPromise = from(this.handleAccess(request, next))
        // return Observable.fromPromise(this.handleAccess(request, next)).map(response => {
        //     console.log(response);

        //     this.globalService.showOrShowloadingModel('hide');
        //     return response;
        // }).catch(error => {
        //     console.log("HTTP error", error);
        //     console.log("status code", error.status);
        //     if (error.status == 401 || error.status == 0 || error.status == 500 || error.status == 400 || error.status == 404) {
        //         this.globalService.showOrShowloadingModel('hide');
        //     }
        //     if (error.status == 0) {
        //         this.globalService.checkInternetConnection();
        //     }
        //     if (error.status == 401) {
        //         //this.globalService.showAlertPrompt("Server code: 401", "Unauthorized.Please login again", "Ok");
        //     }
        //     return Observable.of(error);
        // });

        fromPromise.subscribe((response:any)=> {
            this.globalService.showOrShowloadingModel('hide');
            return response;
        }, error => {
            if (error.status == 401 || error.status == 0 || error.status == 500 || error.status == 400 || error.status == 404) {
                this.globalService.showOrShowloadingModel('hide');
            }
            if (error.status == 0) {
                this.globalService.checkInternetConnection();
            }
            if (error.status == 401) {
                //this.globalService.showAlertPrompt("Server code: 401", "Unauthorized.Please login again", "Ok");
            }
            return of(error);
        })

        return fromPromise;
    }


    private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
        Promise<HttpEvent<any>> {

        if (!request.url.includes('getnotificationcount')) {//hide loader for notification api
        this.globalService.showOrShowloadingModel('show');
        }

        let changedRequest = request;
        const headerSettings: { [name: string]: string | string[]; } = {};

        for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key);
        }

        let userNamePwd;

        if (request.url.includes('razorpay')) {
            userNamePwd = this.globalService.razorPayAuth.vcKeyId + ":" + this.globalService.razorPayAuth.vcKeySecret;
        } else {
            userNamePwd = this.globalService.commonheaderObj.userName + ":" + this.globalService.commonheaderObj.password;
        }


        headerSettings['Authorization'] = "Basic " + btoa(userNamePwd);
        if (request.url.includes('postuploaddocumentapp')) {
        } else {
            headerSettings['Content-Type'] = 'application/json';
        }

        const newHeader = new HttpHeaders(headerSettings);

        changedRequest = request.clone({
            headers: newHeader
        });

        return next.handle(changedRequest).toPromise()
    }
}

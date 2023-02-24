import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
})
export class MakePaymentComponent implements OnInit {
  outStandingGrp: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public globalService: GlobalService,
    public fb: FormBuilder
  ) {
    this.route.params.subscribe((params: any) => {
      if (params) {
        this.outStandingGrp = this.fb.group({
          outStandingAmount: new FormControl(params.amount, [
            Validators.required,
          ]),
        });
      }
    });
  }

  ngOnInit() {}

  makePayment() {
    if (this.outStandingGrp.valid) {
      this.globalService.makePayment(
        this.outStandingGrp.value.outStandingAmount
      );
    } else {
      this.outStandingGrp.markAllAsTouched();
    }
  }
}

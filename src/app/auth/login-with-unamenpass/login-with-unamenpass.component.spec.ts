import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginWithUnamenpassComponent } from './login-with-unamenpass.component';

describe('LoginWithUnamenpassComponent', () => {
  let component: LoginWithUnamenpassComponent;
  let fixture: ComponentFixture<LoginWithUnamenpassComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithUnamenpassComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginWithUnamenpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

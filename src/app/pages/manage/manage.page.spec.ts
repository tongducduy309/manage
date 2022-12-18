import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagePage } from './manage.page';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('ManagePage', () => {
  let component: ManagePage;
  let fixture: ComponentFixture<ManagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePage ],
      imports: [IonicModule.forRoot(),
      AppRoutingModule,ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create form on init',()=>{
    component.ngOnInit();
    expect(component.formAdd).not.toBeUndefined();
    expect(component.formModify).not.toBeUndefined();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

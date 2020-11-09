import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddQuantityPage } from './add-quantity.page';

describe('AddQuantityPage', () => {
  let component: AddQuantityPage;
  let fixture: ComponentFixture<AddQuantityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuantityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddQuantityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

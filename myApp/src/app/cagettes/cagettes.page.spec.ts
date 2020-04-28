import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CagettesPage } from './cagettes.page';

describe('CagettesPage', () => {
  let component: CagettesPage;
  let fixture: ComponentFixture<CagettesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CagettesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CagettesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

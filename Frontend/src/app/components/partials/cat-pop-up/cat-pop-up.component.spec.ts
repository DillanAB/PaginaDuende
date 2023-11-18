import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPopUpComponent } from './cat-pop-up.component';

describe('CatPopUpComponent', () => {
  let component: CatPopUpComponent;
  let fixture: ComponentFixture<CatPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatPopUpComponent]
    });
    fixture = TestBed.createComponent(CatPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

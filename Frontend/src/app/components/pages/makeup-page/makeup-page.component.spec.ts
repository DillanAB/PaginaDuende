import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupPageComponent } from './makeup-page.component';

describe('MakeupPageComponent', () => {
  let component: MakeupPageComponent;
  let fixture: ComponentFixture<MakeupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeupPageComponent]
    });
    fixture = TestBed.createComponent(MakeupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

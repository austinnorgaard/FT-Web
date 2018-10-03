import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteSelectComponent } from './athlete-select.component';

describe('AthleteSelectComponent', () => {
  let component: AthleteSelectComponent;
  let fixture: ComponentFixture<AthleteSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

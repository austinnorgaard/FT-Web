import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSessionPageComponent } from './training-session-page.component';

describe('TrainingSessionPageComponent', () => {
  let component: TrainingSessionPageComponent;
  let fixture: ComponentFixture<TrainingSessionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSessionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

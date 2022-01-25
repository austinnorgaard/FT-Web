import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SessionResultComponent } from './session-result.component';

describe('SessionResultComponent', () => {
  let component: SessionResultComponent;
  let fixture: ComponentFixture<SessionResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

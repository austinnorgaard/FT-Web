import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSetupPageComponent } from './session-setup-page.component';

describe('SessionSetupPageComponent', () => {
  let component: SessionSetupPageComponent;
  let fixture: ComponentFixture<SessionSetupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionSetupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionSetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

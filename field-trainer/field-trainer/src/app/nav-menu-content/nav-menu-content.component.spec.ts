import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuContentComponent } from './nav-menu-content.component';

describe('NavMenuContentComponent', () => {
  let component: NavMenuContentComponent;
  let fixture: ComponentFixture<NavMenuContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMenuContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysContainerComponent } from './days-container.component';

describe('DaysContainerComponent', () => {
  let component: DaysContainerComponent;
  let fixture: ComponentFixture<DaysContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

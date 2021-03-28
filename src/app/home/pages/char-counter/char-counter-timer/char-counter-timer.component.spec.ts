import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCounterTimerComponent } from './char-counter-timer.component';

describe('CharCounterTimerComponent', () => {
  let component: CharCounterTimerComponent;
  let fixture: ComponentFixture<CharCounterTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCounterTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharCounterTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

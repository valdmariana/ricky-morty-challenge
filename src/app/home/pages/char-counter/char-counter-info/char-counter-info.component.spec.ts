import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCounterInfoComponent } from './char-counter-info.component';

describe('CharCounterInfoComponent', () => {
  let component: CharCounterInfoComponent;
  let fixture: ComponentFixture<CharCounterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCounterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharCounterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

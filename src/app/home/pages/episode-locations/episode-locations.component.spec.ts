import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeLocationsComponent } from './episode-locations.component';

describe('EpisodeLocationsComponent', () => {
  let component: EpisodeLocationsComponent;
  let fixture: ComponentFixture<EpisodeLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

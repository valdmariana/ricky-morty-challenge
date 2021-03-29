import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeLocationsComponent } from './episode-locations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { CharactersService } from '../../services/characters/characters.service';

describe('EpisodeLocationsComponent', () => {
  let component: EpisodeLocationsComponent;
  let fixture: ComponentFixture<EpisodeLocationsComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [EpisodesService, CharactersService]
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpisodeLocationsComponent]
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

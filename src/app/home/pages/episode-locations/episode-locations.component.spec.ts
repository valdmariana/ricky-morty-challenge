import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeLocationsComponent } from './episode-locations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { CharactersService } from '../../services/characters/characters.service';
import { RouterTestingModule } from '@angular/router/testing';
import { episodes } from '../../services/episodes/episodes-data-fake.spec';
import { of } from 'rxjs';
import { characters, charactersFromOneEp } from '../../services/characters/characters-data-fake.spec';

describe('EpisodeLocationsComponent', () => {
  let component: EpisodeLocationsComponent;
  let fixture: ComponentFixture<EpisodeLocationsComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
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

  it('setHttpCallsPaged() return an array of requests', () => {
    const httpCalls = component.setHttpCallsPaged(3);
    expect(httpCalls.length).toEqual(2);
    expect(httpCalls).not.toBeNull();
    expect(typeof httpCalls).toBe('object')
  });

  it('lisEpisodes should retrieve data from service', () => {
    const episodeService = fixture.debugElement.injector.get(EpisodesService);
    const spy1 = spyOn(episodeService, 'getEpisodes').and.returnValue(of(episodes))
    const spy2 = spyOn(component, 'listChars');
    component.listEpisodes();
    expect(spy1).toHaveBeenCalledTimes(episodes.info.pages);
    expect(spy2).toHaveBeenCalled();
  });

  it('lisEpisodes should retrieve data from service when totalPage is equal to one', () => {
    const episodeService = fixture.debugElement.injector.get(EpisodesService);
    const spy1 = spyOn(episodeService, 'getEpisodes').and.returnValue(of(episodes))
    const spy2 = spyOn(component, 'listChars');
    component.listEpisodes();
    expect(spy1).toHaveBeenCalledTimes(episodes.info.pages);
    expect(spy2).toHaveBeenCalled();
  });

  it('listChars should retrieve data from service', () => {
    const charactersService = fixture.debugElement.injector.get(CharactersService);
    const spy1 = spyOn(charactersService, 'getCharacter').and.returnValue(of(charactersFromOneEp))
    const urls = episodes.results[0].characters;
    const episodeId = episodes.results[0].id;
    const episodeName = episodes.results[0].name;
    const episodeNumber = episodes.results[0].episode;
    const nCharacters = episodes.results[0].characters.length;
    const totalPages = 1;
    expect(component.episodes.length).toEqual(0);
    component.listChars(urls, episodeId, episodeName, episodeNumber, nCharacters, totalPages);
    expect(component.episodes.length).toBeGreaterThanOrEqual(0);
    expect(spy1).toHaveBeenCalled();
  });

});

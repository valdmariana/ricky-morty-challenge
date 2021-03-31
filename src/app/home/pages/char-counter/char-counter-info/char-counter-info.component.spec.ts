import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharCounterInfoComponent } from './char-counter-info.component';
import { EpisodesService } from '../../../services/episodes/episodes.service';
import { CharactersService } from '../../../services/characters/characters.service';
import { LocationsService } from '../../../services/locations/locations.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { characters } from 'src/app/home/services/characters/characters-data-fake.spec';
import { of } from 'rxjs';
import { episodes } from '../../../services/episodes/episodes-data-fake.spec';
import { locations } from '../../../services/locations/locations-data-fake.spec';

describe('CharCounterInfoComponent', () => {
  let component: CharCounterInfoComponent;
  let fixture: ComponentFixture<CharCounterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharCounterInfoComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [EpisodesService, CharactersService, LocationsService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharCounterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.type = 'characters'
    expect(component).toBeTruthy();
  });

  it('countWordCharacters() return a numeric value as counter', () => {
    const counter = component.countWordCharacters('a', 'Mariana');
    expect(counter).not.toBeNull();
    expect(counter).toBeGreaterThanOrEqual(0)
  });

  it('setHttpCalls() return an array of requests if type is equal to characters', () => {
    component.type = 'characters';
    const httpCalls = component.setHttpCalls(3);
    expect(httpCalls.length).toEqual(2);
    expect(httpCalls).not.toBeNull();
    expect(typeof httpCalls).toBe('object')
  });

  it('setHttpCalls() return an array of requests if type is equal to episodes', () => {
    component.type = 'episodes';
    const httpCalls = component.setHttpCalls(3);
    expect(httpCalls.length).toEqual(2);
    expect(httpCalls).not.toBeNull(2);
    expect(typeof httpCalls).toBe('object')
  });

  it('setHttpCalls() return an empty array if type is empty', () => {
    component.type = '';
    const httpCalls = component.setHttpCalls(3);
    expect(httpCalls.length).toEqual(0);
  });

  it('setHttpCalls() return an array of requests if type is equal to locations', () => {
    component.type = 'locations';
    const httpCalls = component.setHttpCalls(3);
    expect(httpCalls.length).toEqual(2);
    expect(httpCalls).not.toBeNull(2);
    expect(typeof httpCalls).toBe('object')
  });

  it('setCounter should emit type of component', () => {
    component.type = 'characters';
    spyOn(component.setCounter, 'emit');
    component.emitCounterReady()
    fixture.detectChanges();
    expect(component.setCounter.emit).toHaveBeenCalledWith('characters');
  });

  it('countData should retrieve data from service when type is equal to characters', () => {
    component.type = 'characters';
    const charactersService = fixture.debugElement.injector.get(CharactersService);
    const spy1 = spyOn(charactersService, 'getCharacters').and.returnValue(of(characters))
    component.countData();
    expect(spy1).toHaveBeenCalledTimes(characters.info.pages);
  });

  it('countData should retrieve data from service when type is equal to episodes', () => {
    component.type = 'episodes';
    const episodesService = fixture.debugElement.injector.get(EpisodesService);
    const spy1 = spyOn(episodesService, 'getEpisodes').and.returnValue(of(episodes))
    component.countData();
    expect(spy1).toHaveBeenCalledTimes(episodes.info.pages);
  });

  it('countData should retrieve data from service when type is equal to locations', () => {
    component.type = 'locations';
    const locationsService = fixture.debugElement.injector.get(LocationsService);
    const spy1 = spyOn(locationsService, 'getLocations').and.returnValue(of(locations))
    component.countData();
    expect(spy1).toHaveBeenCalledTimes(locations.info.pages);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharCounterComponent } from './char-counter.component';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { CharactersService } from '../../services/characters/characters.service';
import { LocationsService } from '../../services/locations/locations.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CharCounterInfoComponent } from './char-counter-info/char-counter-info.component';

describe('CharCounterComponent', () => {
  let component: CharCounterComponent;
  let fixture: ComponentFixture<CharCounterComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [EpisodesService, CharactersService, LocationsService]
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharCounterComponent, CharCounterInfoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setFlags should set the readyFlag', () => {
    const type = 'characters'
    const spy1 = spyOn(component, 'checkEndOfProgram')
    expect(component.readyFlag[type]).toBe(0)
    component.setFlags(type)
    expect(component.readyFlag[type]).toBe(1)
    expect(spy1).toHaveBeenCalled()
  });

  it('checkEndOfProgram should set endDate on finish counting', () => {
    component.readyFlag['characters'] = 1;
    component.readyFlag['episodes'] = 1;
    component.readyFlag['locations'] = 1;
    expect(component.endDate).toBeUndefined();
    component.checkEndOfProgram()
    expect(component.endDate).not.toBeNull()
  });

  it('checkEndOfProgram should not set endDate if the program has not finished counting', () => {
    component.readyFlag['characters'] = 0;
    component.readyFlag['episodes'] = 1;
    component.readyFlag['locations'] = 1;
    expect(component.endDate).toBeUndefined();
    component.checkEndOfProgram()
    expect(component.endDate).toBeUndefined()
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharCounterComponent } from './char-counter.component';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { CharactersService } from '../../services/characters/characters.service';
import { LocationsService } from '../../services/locations/locations.service';

describe('CharCounterComponent', () => {
  let component: CharCounterComponent;
  let fixture: ComponentFixture<CharCounterComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [EpisodesService, CharactersService, LocationsService]
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharCounterComponent]
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
});

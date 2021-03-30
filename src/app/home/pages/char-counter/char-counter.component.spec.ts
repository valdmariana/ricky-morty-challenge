import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharCounterComponent } from './char-counter.component';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { CharactersService } from '../../services/characters/characters.service';
import { LocationsService } from '../../services/locations/locations.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CharCounterComponent', () => {
  let component: CharCounterComponent;
  let fixture: ComponentFixture<CharCounterComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
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

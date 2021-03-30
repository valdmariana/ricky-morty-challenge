import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters/characters.service';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { LocationsService } from '../../services/locations/locations.service';

interface IObjectKeys {
  [key: string]: number;
}

interface ReadyFlag extends IObjectKeys {
  characters: number;
  episodes: number;
  locations: number;
}

@Component({
  selector: 'app-char-counter',
  templateUrl: './char-counter.component.html',
  styleUrls: ['./char-counter.component.scss']
})
export class CharCounterComponent implements OnInit {
  readyFlag: ReadyFlag = { characters: 0, episodes: 0, locations: 0 };
  startDate!: Date;
  endDate!: Date;
  constructor(
    public _characterService: CharactersService,
    public _episodeService: EpisodesService,
    public _locationService: LocationsService
  ) { }

  ngOnInit(): void {
    this.startDate = new Date();
  }

  setFlags(type: any) {
    this.readyFlag[type] = 1;
    this.checkEndOfProgram();
  }

  checkEndOfProgram() {
    if (this.readyFlag.characters == 1 && this.readyFlag.episodes == 1 && this.readyFlag.locations == 1) {
      this.endDate = new Date();
    }
  }

}

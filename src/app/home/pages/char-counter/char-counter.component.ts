import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CharactersService } from '../../services/characters/characters.service';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { LocationsService } from '../../services/locations/locations.service';

interface mainCounter {
  counterChar: number;
  counterEp: number;
  counterLoc: number;
}

@Component({
  selector: 'app-char-counter',
  templateUrl: './char-counter.component.html',
  styleUrls: ['./char-counter.component.scss']
})
export class CharCounterComponent implements OnInit {
  counter: mainCounter = { counterChar: 0, counterEp: 0, counterLoc: 0 };
  readyFlag: mainCounter = { counterChar: 0, counterEp: 0, counterLoc: 0 };
  startDate!: Date;
  endDate!: Date;
  constructor(
    public _characterService: CharactersService,
    public _episodeService: EpisodesService,
    public _locationService: LocationsService
  ) { }

  ngOnInit(): void {
    this.startDate = new Date();
    this.selectData('characters');
    this.selectData('episodes');
    this.selectData('locations');
  }

  selectData(type: string) {
    if (type == 'characters') {
      this._characterService.getCharacters(1).subscribe(characters => {
        this.listData(characters, type)
      });
    } else if (type == 'episodes') {
      this._episodeService.getEpisodes(1).subscribe(episodes => {
        this.listData(episodes, type)
      });
    } else if (type == 'locations') {
      this._locationService.getLocations(1).subscribe(location => {
        this.listData(location, type)
      });
    }
  }

  listData(data: any, type: string) {
    data.results.forEach((characters: any) => {
      this.setCounter(type, characters.name);
    });
    if (data.info.pages > 1) {
      var httpCalls = this.setHttpCalls(data.info.pages, type);
      forkJoin(httpCalls).subscribe(data => {
        data.forEach(page => {
          page.results.forEach((characters: any) => {
            this.setCounter(type, characters.name);
          });
        });
        this.setFlag(type)
        this.checkEndOfProgram();
      });
    }
  }

  checkEndOfProgram() {
    if (this.readyFlag.counterChar == 1 && this.readyFlag.counterEp == 1 && this.readyFlag.counterLoc == 1) {
      this.endDate = new Date();
    }
  }

  setFlag(type: string) {
    if (type == 'characters') {
      this.readyFlag.counterChar = 1;
    } else if (type == 'episodes') {
      this.readyFlag.counterEp = 1;
    } else if (type == 'locations') {
      this.readyFlag.counterLoc = 1;
    }
  }

  setCounter(type: string, name: string) {
    if (type == 'characters') {
      this.counter.counterChar = this.counter.counterChar + this.countWordCharacters('c', name);
    } else if (type == 'episodes') {
      this.counter.counterEp = this.counter.counterEp + this.countWordCharacters('e', name)
    } else if (type == 'locations') {
      this.counter.counterLoc = this.counter.counterLoc + this.countWordCharacters('l', name)
    }
  }

  setHttpCalls(totalPages: number, type: string) {
    var httpCalls = [];
    for (let index = 2; index <= totalPages; index++) {
      if (type == 'characters') {
        httpCalls.push(this._characterService.getCharacters(index))
      } else if (type == 'episodes') {
        httpCalls.push(this._episodeService.getEpisodes(index))
      } else if (type == 'locations') {
        httpCalls.push(this._locationService.getLocations(index))
      }
    }
    return httpCalls
  }

  countWordCharacters(char: string, word: string) {
    var re = new RegExp(char, 'g');
    return (word.toLowerCase().match(re) || []).length;
  }
}

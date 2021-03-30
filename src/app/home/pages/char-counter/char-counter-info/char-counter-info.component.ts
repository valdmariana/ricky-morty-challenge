import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CharactersService } from '../../../services/characters/characters.service';
import { EpisodesService } from '../../../services/episodes/episodes.service';
import { LocationsService } from '../../../services/locations/locations.service';

@Component({
  selector: 'app-char-counter-info',
  templateUrl: './char-counter-info.component.html',
  styleUrls: ['./char-counter-info.component.scss']
})
export class CharCounterInfoComponent implements OnInit {
  @Input() type!: string;
  @Output() setCounter = new EventEmitter<string>();

  counter: number = 0;
  constructor(public _characterService: CharactersService,
    public _episodeService: EpisodesService,
    public _locationService: LocationsService) { }

  ngOnInit(): void {
    this.countData()
  }

  countData() {
    if (this.type == 'characters') {
      this._characterService.getCharacters(1).subscribe(characters => {
        this.listData(characters)
      });
    } else if (this.type == 'episodes') {
      this._episodeService.getEpisodes(1).subscribe(episodes => {
        this.listData(episodes)
      });
    } else if (this.type == 'locations') {
      this._locationService.getLocations(1).subscribe(location => {
        this.listData(location)
      });
    }
  }

  listData(data: any) {
    data.results.forEach((character: any) => {
      this.counter = this.counter + this.countWordCharacters('c', character.name);
    });
    if (data.info.pages > 1) {
      var httpCalls = this.setHttpCalls(data.info.pages);
      forkJoin(httpCalls).subscribe(data => {
        data.forEach(page => {
          page.results.forEach((character: any) => {
            this.counter = this.counter + this.countWordCharacters('c', character.name);
          });
        });
        this.emitCounterReady()
      });
    }
  }

  emitCounterReady() {
    this.setCounter.emit(this.type)
  }

  setHttpCalls(totalPages: number) {
    var httpCalls = [];
    for (let index = 2; index <= totalPages; index++) {
      if (this.type == 'characters') {
        httpCalls.push(this._characterService.getCharacters(index))
      } else if (this.type == 'episodes') {
        httpCalls.push(this._episodeService.getEpisodes(index))
      } else if (this.type == 'locations') {
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

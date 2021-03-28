import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CharactersService } from '../../services/characters/characters.service';
import { map, catchError } from 'rxjs/operators';

interface Character {
  name: string;
}

interface MainData {
  characters: Character[]
}

interface RestData {
  info: any;
  results: any;
}

interface HttpCalls {
  charactersCalls: any[];
  episodesCalls: any[];
  locationsCalls: any[]
}

interface totalPages {
  totalPagesChar: number;
  totalPagesEp: number;
  totalPagesLoc: number;
}

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
  currentPage: number = 1;
  totalPage: totalPages = { totalPagesChar: 0, totalPagesEp: 0, totalPagesLoc: 0 };
  counter: mainCounter = { counterChar: 0, counterEp: 0, counterLoc: 0 };
  data: MainData = { characters: [] };
  constructor(public _charactersService: CharactersService) { }

  ngOnInit(): void {
    this.selectData('characters');
  }

  selectData(type: string) {
    if (type = 'characters') {
      this._charactersService.getCharacters(1).subscribe(characters => {
        this.listData(characters, type)
      })
    }
  }

  listData(data: any, type: string) {
    data.results.forEach((characters: any, index: number) => {
      this.setCounter(type, characters.name);
    });
    if (data.info.pages > 1) {
      var httpCalls = this.setHttpCalls(data.info.pages, type);
      forkJoin(httpCalls).subscribe(data => {
        data.forEach(page => {
          page.results.forEach((characters: any, index: number) => {
            this.setCounter(type, characters.name);
          });
        });
        console.log(this.counter.counterChar)
      });
    }
  }

  setCounter(type: string, name: string) {
    if (type == 'characters') {
      this.counter.counterChar = this.counter.counterChar + this.countWordCharacters('c', name);
    }
  }

  setHttpCalls(totalPages: number, type: string) {
    var httpCalls = [];
    for (let index = 2; index <= totalPages; index++) {
      if (type == 'characters') {
        httpCalls.push(this._charactersService.getCharacters(index))
      }
    }
    return httpCalls
  }

  countWordCharacters(char: string, word: string) {
    var re = new RegExp(char, 'g');
    return (word.toLowerCase().match(re) || []).length;
  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.currentPage) {
      console.log(changes.currentPage.currentValue);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { CharactersService } from '../../services/characters/characters.service';
import { forkJoin } from 'rxjs';

interface EpisodeOutput {
  id: number;
  countCharacters: number;
  name: string;
  episode: string;
  locations: string[];
}

@Component({
  selector: 'app-episode-locations',
  templateUrl: './episode-locations.component.html',
  styleUrls: ['./episode-locations.component.scss']
})
export class EpisodeLocationsComponent implements OnInit {
  episodes: EpisodeOutput[] = [];
  startDate!: Date;
  endDate!: Date;
  constructor(
    public _episodeService: EpisodesService,
    public _characterService: CharactersService) { }

  ngOnInit(): void {
    this.startDate = new Date();
    this.listData()
  }

  listData() {
    this._episodeService.getEpisodes(1).subscribe((response) => {
      response.results.forEach((episode: any) => {
        this.listChars(episode.characters, episode.id, episode.name, episode.episode, episode.characters.length, response.info.count);
      });
      if (response.info.pages > 1) {
        var httpCallsEpisodes = this.setHttpCallsPaged(response.info.pages);
        forkJoin(httpCallsEpisodes).subscribe(data => {
          data.forEach((page: any) => {
            page.results.forEach((episode: any) => {
              this.listChars(episode.characters, episode.id, episode.name, episode.episode, episode.characters.length, response.info.count);
            });
          });
        });
      }
    });
  }

  listChars(urls: string[], id: number, name: string, episode: string, countCharacters: number, totalPages: number) {
    let ids: string[] = []
    let locations: string[] = [];
    urls.forEach(url => {
      let id = url.substring(url.lastIndexOf("/") + 1, url.length);
      ids.push(id)
    });
    this._characterService.getCharacter(ids.join(',')).subscribe((characters) => {
      characters.forEach((character: any) => {
        if (!locations.includes(character.origin.name)) {
          locations.push(character.origin.name);
        }
      });
      this.episodes.push({ id, name, countCharacters, episode, locations });
      // console.log(this.episodes.length, totalPages)
      if (this.episodes.length == totalPages) {
        this.endDate = new Date()
        console.log('Termino', this.startDate, this.endDate)
      }
      console.log(this.episodes)
    });
  }

  setHttpCallsPaged(totalPages: number) {
    var httpCalls: any[] = [];
    for (let index = 2; index <= totalPages; index++) {
      httpCalls.push(this._episodeService.getEpisodes(index))
    }
    return httpCalls;
  }
}

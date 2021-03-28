import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharCounterComponent } from './pages/char-counter/char-counter.component';
import { EpisodeLocationsComponent } from './pages/episode-locations/episode-locations.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [CharCounterComponent, EpisodeLocationsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

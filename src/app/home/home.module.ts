import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharCounterComponent } from './pages/char-counter/char-counter.component';
import { EpisodeLocationsComponent } from './pages/episode-locations/episode-locations.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [CharCounterComponent, EpisodeLocationsComponent, HomeComponent],
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

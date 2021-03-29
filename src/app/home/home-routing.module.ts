import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharCounterComponent } from './pages/char-counter/char-counter.component';
import { EpisodeLocationsComponent } from './pages/episode-locations/episode-locations.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: "home" },
    { path: 'home', component: HomeComponent },
    { path: 'char-counter', component: CharCounterComponent },
    { path: 'episode-locations', component: EpisodeLocationsComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

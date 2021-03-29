import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharCounterComponent } from './pages/char-counter/char-counter.component';
import { EpisodeLocationsComponent } from './pages/episode-locations/episode-locations.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: "home" },
    { path: 'home', component: EpisodeLocationsComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

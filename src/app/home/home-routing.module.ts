import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharCounterComponent } from './pages/char-counter/char-counter.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: "home" },
    { path: 'home', component: CharCounterComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

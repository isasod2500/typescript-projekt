import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found'; 

export const routes: Routes = [
    { path: "home", component: Home },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "404", component: NotFound},
    { path: '**', component: NotFound}
];

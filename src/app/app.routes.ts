import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found'; 
import { MyPage } from './my-page/my-page';

export const routes: Routes = [
    { path: "home", component: Home },
    { path: "mypage", component: MyPage},
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "404", component: NotFound},
    { path: '**', component: NotFound}
];

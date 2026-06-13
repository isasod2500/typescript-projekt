import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {}

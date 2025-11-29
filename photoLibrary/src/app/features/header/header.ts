import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbar, MatButton, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  
}

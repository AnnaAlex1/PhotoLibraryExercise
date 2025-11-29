import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}

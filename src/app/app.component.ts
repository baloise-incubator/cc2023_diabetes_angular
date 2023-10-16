import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  items: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.items = ['apple', 'banana']
  }
}

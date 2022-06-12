import { Component, OnInit } from '@angular/core';

export class ListItem {
  public imagePath: string;
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  listItems: ListItem[];
  image = 'assets/images/ape.png';
}

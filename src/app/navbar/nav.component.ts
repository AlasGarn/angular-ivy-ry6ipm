import { Component, OnInit } from '@angular/core';
//import '../../assets/test.js';
declare var test: any;
@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  title = 'app works!';
  f() {
    new test();
  }
}

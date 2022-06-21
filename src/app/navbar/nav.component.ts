import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
	  constructor(private router: Router) {}

  scroll(event) {
	this.router.navigate([], { fragment: event.currentTarget.id});
	  console.log(event.target);
     // el.scrollIntoView({behavior: 'smooth'});
  }
}

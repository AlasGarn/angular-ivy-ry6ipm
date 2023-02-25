import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
@Component({
  selector: 'mysite',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
  ) {}  
}

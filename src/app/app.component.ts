import { Component, Input, Inject, NgZone, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadingService } from './services/loader.service';
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

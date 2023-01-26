import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [BrowserModule, PdfViewerModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

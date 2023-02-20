import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
declare global {
  interface Window {
    XHRInterceptor: any;
  }
}

type DataSent = 
  string | Document | Blob | ArrayBufferView | 
  ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array>;

export class XHRInterceptor {
  constructor() {
    ((original: Function): void => {
      XMLHttpRequest.prototype.send = (data: DataSent): void => {
        console.log('DATA SENT');
        original.call(this, data);
      };
    })(XMLHttpRequest.prototype.send);

    (function(original: Function) {
      // @ts-ignore
      XMLHttpRequest.prototype.open = (
        method: string, url: string, async: boolean,
        username?: string | null, password?: string | null
      ): void => {
        console.log('DATA OPEN');
        original.call(this, method, url, async, username, password);
      };
    })(XMLHttpRequest.prototype.open);
  }
}

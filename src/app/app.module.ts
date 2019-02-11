import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxFaviconModule } from 'ngx-favicon';
import { customFavicons, AvailableCustomFavicons } from './favicon.config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxFaviconModule.forRoot<AvailableCustomFavicons>({
      faviconElementId: 'favicon',
      defaultUrl: 'favicon.ico',
      custom: customFavicons,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

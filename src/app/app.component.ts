import { Component } from '@angular/core';
import { NgxFaviconService } from 'ngx-favicon';
import { CustomFavicon } from './favicon.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public CustomFavicon: typeof CustomFavicon = CustomFavicon;

  constructor(private ngxFaviconService: NgxFaviconService<CustomFavicon>) {}

  public setDefaultFavicon(): void {
    this.ngxFaviconService.setDefaultFavicon();
  }

  public setCustomFavicon(faviconName: CustomFavicon): void {
    this.ngxFaviconService.setCustomFavicon(faviconName);
  }
}

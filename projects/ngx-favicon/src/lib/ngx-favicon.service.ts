import { Injectable, Renderer2, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NGX_FAVICON_CONFIG } from './ngx-favicon.tokens';
import { NgxFaviconConfig, Dictionary } from './ngx-favicon.interface';

export class NgxFaviconUnknownFaviconError extends Error {
  constructor(faviconName: string) {
    super(
      `Favicon with name "${faviconName}" was not found into the "custom" property of the config`,
    );
  }
}

// https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
@Injectable()
export class NgxFaviconService<CustomFavicon extends string> {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(NGX_FAVICON_CONFIG)
    private ngxFaviconConfig: NgxFaviconConfig<Dictionary<string>>,
  ) {}

  public setCustomFavicon(faviconName: CustomFavicon): void {
    if (!faviconName || !this.ngxFaviconConfig.custom[faviconName]) {
      throw new NgxFaviconUnknownFaviconError(faviconName);
    }

    this.updateFavicon(faviconName);
  }

  public setDefaultFavicon(): void {
    this.updateFavicon();
  }

  private updateFavicon(faviconName?: CustomFavicon): void {
    if (!this.document) {
      return;
    }

    const linkElement: HTMLLinkElement = document.getElementById(
      this.ngxFaviconConfig.faviconElementId,
    ) as HTMLLinkElement;

    linkElement.type = 'image/x-icon';
    linkElement.rel = 'icon';
    linkElement.href =
      this.ngxFaviconConfig.custom[faviconName] ||
      this.ngxFaviconConfig.defaultUrl;
  }
}

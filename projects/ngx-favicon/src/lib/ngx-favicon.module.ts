import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxFaviconService } from './ngx-favicon.service';
import { NgxFaviconConfig, Dictionary } from './ngx-favicon.interface';
import { NGX_FAVICON_CONFIG } from './ngx-favicon.tokens';

class NgxFaviconConfigurationRequiredError extends Error {
  constructor() {
    super(
      'Please provide a configuration when calling "NgxFaviconModule.forRoot(CONF GOES HERE)"',
    );
  }
}

@NgModule()
export class NgxFaviconModule {
  static forRoot<CustomFaviconConfig extends Dictionary<string>>(
    conf: NgxFaviconConfig<CustomFaviconConfig>,
  ): ModuleWithProviders {
    if (!conf) {
      throw new NgxFaviconConfigurationRequiredError();
    }

    return {
      ngModule: NgxFaviconModule,
      providers: [
        NgxFaviconService,
        { provide: NGX_FAVICON_CONFIG, useValue: conf },
      ],
    };
  }
}

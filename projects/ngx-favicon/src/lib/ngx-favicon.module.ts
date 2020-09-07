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
  ): ModuleWithProviders<NgxFaviconModule> {
    // the following check can't (unfortunately) be there, otherwise
    // AOT compilation (for the app!) will fail
    // https://github.com/angular/angular-cli/issues/9358#issuecomment-361865955
    // if (!conf) {
    //   throw new NgxFaviconConfigurationRequiredError();
    // }

    return {
      ngModule: NgxFaviconModule,
      providers: [
        NgxFaviconService,
        { provide: NGX_FAVICON_CONFIG, useValue: conf },
      ],
    };
  }
}

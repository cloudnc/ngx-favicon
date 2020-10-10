import { InjectionToken } from '@angular/core';
import { NgxFaviconConfig, Dictionary } from './ngx-favicon.interface';

export const NGX_FAVICON_CONFIG: InjectionToken<NgxFaviconConfig<
  Dictionary<string>
>> = new InjectionToken<NgxFaviconConfig<Dictionary<string>>>(
  'NGX_FAVICON_CONFIG',
);

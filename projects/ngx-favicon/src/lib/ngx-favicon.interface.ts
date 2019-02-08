export interface Dictionary<T> {
  [key: string]: T;
}

export interface NgxFaviconConfig<CustomFavicon extends Dictionary<string>> {
  faviconElementId: string;
  defaultUrl: string;
  custom: CustomFavicon;
}

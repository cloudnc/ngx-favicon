// enum all your different favicons
// (for type safety)
export enum CustomFavicon {
  FAVICON_SUCCESS = 'faviconSuccess',
  FAVICON_ERROR = 'faviconError',
}

export type AvailableCustomFavicons = { [key in CustomFavicon]: string };

// -------------------------------------------------------------
// @warning do not forget to add your favicons to your bundle
// you should double check into angular.json file
// -------------------------------------------------------------
// map all the types of favicon to their href
export const customFavicons: AvailableCustomFavicons = {
  [CustomFavicon.FAVICON_SUCCESS]: 'favicon-success.ico',
  [CustomFavicon.FAVICON_ERROR]: 'favicon-error.ico',
};

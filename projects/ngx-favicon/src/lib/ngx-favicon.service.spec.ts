import { TestBed } from '@angular/core/testing';

import { NgxFaviconService } from './ngx-favicon.service';

describe('NgxFaviconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFaviconService = TestBed.get(NgxFaviconService);
    expect(service).toBeTruthy();
  });
});

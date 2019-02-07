import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFaviconComponent } from './ngx-favicon.component';

describe('NgxFaviconComponent', () => {
  let component: NgxFaviconComponent;
  let fixture: ComponentFixture<NgxFaviconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxFaviconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFaviconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

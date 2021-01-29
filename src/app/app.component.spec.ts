import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  DebugElement,
  Component,
  ContentChild,
  ViewChild,
} from '@angular/core';
import {
  NgxFaviconModule,
  NgxFaviconConfig,
  NgxFaviconService,
  NgxFaviconUnknownFaviconError,
} from 'ngx-favicon';
import {
  AvailableCustomFavicons,
  customFavicons,
  CustomFavicon,
} from './favicon.config';
import { click, queryByCss } from './helpers/testing.helpers';

@Component({
  selector: 'app-host-component',
  template: `
    <link id="favicon" rel="icon" type="image/x-icon" href="favicon.ico" />

    <app-root></app-root>
  `,
})
class HostComponent {
  @ViewChild(AppComponent)
  public appComponent: AppComponent;
}

describe('AppComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let debug: DebugElement;
  let ngxFaviconService: NgxFaviconService<CustomFavicon>;

  const DOM = {
    get favicon(): DebugElement {
      return queryByCss(debug, '#favicon');
    },
    buttons: {
      get default(): DebugElement {
        return queryByCss(debug, '[data-btn-default]');
      },
      get success(): DebugElement {
        return queryByCss(debug, '[data-btn-success]');
      },
      get url(): DebugElement {
        return queryByCss(debug, '[data-btn-url]');
      },
      get error(): DebugElement {
        return queryByCss(debug, '[data-btn-error]');
      },
    },
  };

  const ngxFaviconConfig: NgxFaviconConfig<AvailableCustomFavicons> = {
    faviconElementId: 'favicon',
    defaultUrl: 'favicon.ico',
    custom: customFavicons,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NgxFaviconModule.forRoot<AvailableCustomFavicons>(ngxFaviconConfig),
        ],
        declarations: [HostComponent, AppComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    ngxFaviconService = TestBed.get(NgxFaviconService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have at the beginning the default icon', () => {
    expect(getFaviconHrefFromDom(DOM)).toMatch(
      getExpectedRegex(ngxFaviconConfig.defaultUrl),
    );
  });

  it(`should throw an error if trying to set a favicon which doesn't exist`, () => {
    expect(() =>
      ngxFaviconService.setCustomFavicon('unknown-favicon-key' as any),
    ).toThrow(new NgxFaviconUnknownFaviconError('unknown-favicon-key'));
  });

  it('should change the favicon dynamically', () => {
    expect(getFaviconHrefFromDom(DOM)).toMatch(
      getExpectedRegex(ngxFaviconConfig.defaultUrl),
    );

    click(DOM.buttons.success);
    fixture.detectChanges();

    expect(getFaviconHrefFromDom(DOM)).toMatch(
      getExpectedRegex(ngxFaviconConfig.custom.faviconSuccess),
    );

    click(DOM.buttons.error);
    fixture.detectChanges();

    expect(getFaviconHrefFromDom(DOM)).toMatch(
      getExpectedRegex(ngxFaviconConfig.custom.faviconError),
    );

    click(DOM.buttons.default);
    fixture.detectChanges();

    expect(getFaviconHrefFromDom(DOM)).toMatch(
      getExpectedRegex(ngxFaviconConfig.defaultUrl),
    );
  });

  it('should change the favicon by url', () => {
    click(DOM.buttons.url);
    fixture.detectChanges();

    expect(getFaviconHrefFromDom(DOM)).toBe(
      component.appComponent.customUrlExample,
    );
  });
});

function getFaviconHrefFromDom(DOM: {
  readonly favicon: DebugElement;
  buttons: {
    readonly default: DebugElement;
    readonly success: DebugElement;
    readonly error: DebugElement;
  };
}) {
  return (DOM.favicon.nativeElement as HTMLLinkElement).href;
}

function getExpectedRegex(faviconName: string) {
  return new RegExp(`^http://localhost:[0-9]+/${faviconName}$`);
}

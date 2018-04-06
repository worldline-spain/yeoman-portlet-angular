import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

import { TranslateService, LiferayService, SharedModule,TranslateHttpLoader,TranslateModule, TranslateLoader  } from '../../services/shared.module';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';


function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './o/porlet-test/js/assets/i18n/locale-', '.json');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  /**
   * Initialize TestBed for browser testing
   */
  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  /**
   * Initialize a testing module with all required imports/declarations
   * to test desired component.
   *
   * In this example many imports are required because we are using AppComponent,
   * so test module initialization is a subset of AppModule initialization.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        FormsModule,
        HttpModule,
        SharedModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
        })
      ],
      providers: [
        { provide: LiferayService, useClass: MockLiferayService }
      ]
    })
      .compileComponents();
  }));

  /**
   * Instantiate the fixture and components
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Perform data binding
    fixture.detectChanges();
  });

  /**
   * Example of unit test involving only the component controller
   */
  it('Initially numClicks is zero', () => {
    expect(component.numClicks).toBe(0);
  });

  /**
   * Example of unit test invoking UI event handlers manually
   */
  it('Increments counter by 1', () => {
    component.clicked();
    expect(component.numClicks).toBe(1);
    component.clicked();
    expect(component.numClicks).toBe(2);
  });

  /**
   * Example of integration test involving DOM
   */
  it('Contains an increment button', () => {
    var el = fixture.nativeElement.querySelector('#clicker');
    expect(el).not.toBeNull();
  });

  /**
   * Example of integration test involving data binding, UI event handling and DOM checking
   */
  it('Pressing the button increments counter', () => {
    var el = fixture.nativeElement.querySelector('#clicker');
    el.click();

    // See changes in controller
    expect(component.numClicks).toBe(1);

    // See changes in HTML
    fixture.detectChanges();
    var span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.textContent).toContain('1 clicks.');
  });
});

/**
 * Mock class as an example of overriding component dependencies with mock classes.
 */
class MockLiferayService {
  getLanguageLiferay(): string { return 'es_ES'; }
}

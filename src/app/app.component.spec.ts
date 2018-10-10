import { MyApp } from './app.component'
import { TestBed, inject } from '@angular/core/testing'
import { IonicModule, Platform } from 'ionic-angular';
import { PlatformMock, StatusBarMock, SplashScreenMock } from 'ionic-mocks'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, BaseRequestOptions, RequestMethod } from '@angular/http';
import { MockBackEnd } from '@angular/http/testing';
import { Angular2TokenService } from 'angular2-token';
import { iterateListLike } from '../../node_modules/@angular/core/src/change_detection/change_detection_util';

describe('AppComponent', () => {
  let fixture, component;

  let signInData = {
    email: 'test@test.com',
    password: 'password',
    userType: String
  };

  beforeEach(() =>  {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        BaseRequestOptions,
        MockBackEnd,
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => {
            return new Http(backend, defaultOptions)
          },
          deps: [MockBackEnd, BaseRequestOptions]
        },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
        { provide: SplashScreen, useFactory: () => SplashScreenMock.instance() }
      ]
    });

      fixture = TestBed.createComponent(MyApp);
      component = fixture.componentInstance;
  });

  it('should create the app',() => {
    expect(component).toBeTruthy();
    expect(component instanceof MyApp).toEqual(true);
  });

  it('login method', inject([Angular2TokenService, MockBackEnd], (Angular2TokenService, mockBackend) => {

    mockBackend.connections.subscribe(
      c => {
        expect(c.request.getBody()).toEqual(JSON.stringify(signInData));
        expect(c.request.method).toEqual(RequestMethod.Post);
        expect(c.request.url).toEqual('https://your-cooper-api.herokuapp.com/api/v1/auth/sign_in');
      }
    );

    component.login(signInData);
  }));

  it('signOut method', inject([Angular2TokenService, MockBackEnd], (Angular2TokenService, mockBackend) => {

    mockBackend.connections.subscribe(
      c => {
        expect(c.request.method).toEqual(RequestMethod.Delete);
        expect(c.request.url).toEqual('https://your-cooper-api.herokuapp.com/api/v1/auth/sign_out');
      }
    );

    component.logout();
  }));
});
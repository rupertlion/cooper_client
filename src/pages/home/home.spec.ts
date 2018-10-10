import { HomePage } from "./home";
import { TestBed, async, inject } from "@angular/core/testing";
import { IonicModule, Platform, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { PlatformMock, StatusBarMock, SplashScreenMock, NavControllerMock } from "ionic-mocks";
import { PersonProvider } from "../../providers/person/person";
import { CooperProvider } from "../../providers/cooper/cooper";
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';
import { Angular2TokenService } from 'angular2-token';
import { ModalController } from 'ionic-angular';

describe("HomePage", () => {
    let homepage;
    let fixture;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            HomePage
        ],
        imports: [IonicModule.forRoot(HomePage)],
        providers: [
            { provide: Platform, useFactory: () => PlatformMock.instance() },
            { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
            { provide: SplashScreen, useFactory: () => SplashScreenMock.instance() },
            { provide: NavController, useFactory: () => NavControllerMock.instance() },
            PersonProvider,
            CooperProvider,
            PerformanceDataProvider,
            Angular2TokenService,
            ModalController
        ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        homepage = fixture.componentInstance;
    });

    it("should create the home page", () => {
        expect(homepage).toBeTruthy();
        expect(homepage instanceof HomePage).toEqual(true);
    });

    it('should have user default values', () => {
        expect(homepage.user).toEqual({ distance: 1000, age: 20, gender: 'female' });
    });

    it("should have user array", () => {
        expect(homepage.user).toEqual({ distance: 1000, age: 20, gender: 'female' });
    });

    it("should have calculate function", () => {
        expect(homepage.calculate).toBeTruthy();
    });

    it("calculate function should call person provider doAssessment function", inject(
        [PersonProvider],
        person => {
            homepage.user = { age: 25, gender: "female", distance: 2500 };
            spyOn(person, "doAssessment").and.returnValue("Above average");

            homepage.calculate();

            expect(person.doAssessment).toHaveBeenCalled();
            expect(person.doAssessment).toHaveBeenCalledWith(2500);
            expect(person.age).toEqual(25);
            expect(person.gender).toEqual("female");
        }
    ));
});
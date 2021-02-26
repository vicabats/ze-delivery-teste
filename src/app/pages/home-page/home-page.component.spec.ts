import { ComponentFixture, TestBed, waitForAsync, fakeAsync, async } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/core/services/location.service';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { LatLng } from 'src/app/core/interfaces/location';

@Component({
  selector: 'app-autocomplete-address-input',
  template: ''
}) class AutocompleteAddressInputStub {}

Injectable()
class RouterStub {
  public navigate() {
    return '';
  }
}

Injectable()
class LocationServiceStub {
  public latLngSubject = new BehaviorSubject<LatLng>(null);
  public latLng$ = this.latLngSubject.asObservable();

  subscribe() {
    return of([{lat: '1', lng: '2'}]);
  }
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let locationService: LocationServiceStub;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent, AutocompleteAddressInputStub ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: LocationService, useClass: LocationServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should subscribe to latLng onInit', () => {
    fixture.detectChanges();
    spyOn(component, 'subscribeToLatLng').and.callThrough();    
    component.ngOnInit();
    expect(component.subscribeToLatLng).toHaveBeenCalled();
  });

  it ('should call navigateToProductsList once it has the coordernates', async(() => {
    const locationService = new LocationService();
    locationService.latLngSubject.next({lat: '-23.6362601', lng: '-46.6952777'});
    
    spyOn(component, 'subscribeToLatLng').and.callThrough();
    spyOn(component, 'navigateToProductsList').and.callThrough();
    waitForAsync(() => {
      component.subscribeToLatLng();
      expect(component.navigateToProductsList).toHaveBeenCalled();    
    })    
  }))
});

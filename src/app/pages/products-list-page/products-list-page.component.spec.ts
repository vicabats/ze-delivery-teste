import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListPageComponent } from './products-list-page.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/core/services/location.service';
import { QueriesService } from 'src/app/core/services/queries.service';
import { observable, BehaviorSubject } from 'rxjs';
import { LatLng } from 'src/app/core/interfaces/location';

Injectable()
class RouterStub {
  public navigate() {
    return '';
  }
}

Injectable()
class LocationServiceStub {
  public latLngSubject = new BehaviorSubject<LatLng>(null);

  public clearLatLng() {
    this.latLngSubject.next(null);
  }
}

Injectable()
class QueriesServiceStub {
  public callProductListQuery() {
    return new Promise<void>(null)
  };
}


describe('ProductsListPageComponent', () => {
  let component: ProductsListPageComponent;
  let fixture: ComponentFixture<ProductsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsListPageComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: LocationService, useClass: LocationServiceStub },
        { provide: QueriesService, useClass: QueriesServiceStub }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutocompleteAddressInputComponent } from './autocomplete-address-input.component';
import { Injectable } from '@angular/core';
import { LocationService } from 'src/app/core/services/location.service';
import { FormsModule } from '@angular/forms';


Injectable()
class LocationServiceStub {
  public setSelectedPlace() {}
}

describe('AutocompleteAddressInputComponent', () => {
  let component: AutocompleteAddressInputComponent;
  let fixture: ComponentFixture<AutocompleteAddressInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteAddressInputComponent ],
      providers: [
        { provide: LocationService, useClass: LocationServiceStub }
      ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteAddressInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

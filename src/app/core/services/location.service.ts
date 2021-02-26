import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { LatLng } from '../interfaces/location';

@Injectable()
export class LocationService {

  private selectedPlace: string;
  private lat: string;
  private lng: string;

  public latLngSubject = new BehaviorSubject<LatLng>(null);
  public latLng$ = this.latLngSubject.asObservable();

  constructor() { }

  public setSelectedPlace(placeQueries: any) {
    const autocompleteOptions = new google.maps.places.Autocomplete(placeQueries.nativeElement,
      {
        componentRestrictions: { country: 'BR' },
    });

    google.maps.event.addListener(autocompleteOptions, 'place_changed', () => {
      const selectedPlace: google.maps.places.PlaceResult = autocompleteOptions.getPlace();
      this.selectedPlace = selectedPlace.formatted_address;
      this.setSelectedPlaceLatLng();
    });
  }

  private setSelectedPlaceLatLng() {
    this.getAddressValues(this.selectedPlace).subscribe((place) => {
      const placeLocation = place[0].geometry.location;
      this.lat = placeLocation.lat().toString();
      this.lng = placeLocation.lng().toString();

      this.latLngSubject.next({lat: this.lat, lng: this.lng});
    });
  }

  private getAddressValues(query: string): Observable<google.maps.GeocoderResult[]> {
    const geocoder = new google.maps.Geocoder();
    return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
      geocoder.geocode({ address: query}, (
        (data: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          status === google.maps.GeocoderStatus.OK ? observer.next(data) : observer.error(status);
        }
      ))
    })
  }

  public clearLatLng() {
    this.latLngSubject.next(null);
  }

  public getSelectedPlaceLat() {
    return this.lat;
  }

  public getSelectedPlaceLng() {
    return this.lng;
  }
}

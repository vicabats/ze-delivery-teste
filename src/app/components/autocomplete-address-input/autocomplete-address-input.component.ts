import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-autocomplete-address-input',
  templateUrl: './autocomplete-address-input.component.html',
  styleUrls: ['./autocomplete-address-input.component.scss']
})

export class AutocompleteAddressInputComponent implements AfterViewInit {

  public autocompleteInput: string;
  public querySubscription: Subscription;

  @ViewChild('placeQueries') placeQueries: any;

  constructor(private location: LocationService) {}

  ngAfterViewInit() {
    this.setAutocompletePlace();
  }

  private setAutocompletePlace() {
    this.location.setSelectedPlace(this.placeQueries);
  }
}

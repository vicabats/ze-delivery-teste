import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/core/services/location.service';
import { LatLng } from 'src/app/core/interfaces/location';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  
  public errorFeedback: string = '';
  public subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private location: LocationService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.subscribeToLatLng();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe() );
  }

  public subscribeToLatLng() {
    this.subscriptions.push(
      this.location.latLng$.subscribe((coordenates: LatLng) => {
        if (coordenates) {
          this.navigateToProductsList();
        }
      })
    );
  }

  public navigateToProductsList() {
    this.ngZone.run(() => {
      this.router.navigate(['products']);
    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/core/services/location.service';
import { QueriesService } from 'src/app/core/services/queries.service';
import { LatLng } from 'src/app/core/interfaces/location';
import { Category, CategoryName } from 'src/app/core/interfaces/categories-query';
import { Product } from 'src/app/core/interfaces/products-list-query';

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit, OnDestroy {

  // Queries needed values
  private latLng: LatLng;

  // Queries values
  private distributorId: number;
  public productsList: Product[] = [];

  // Products per category
  public beerProducts: Product[] = [];
  public distilledProducts: Product[] = [];
  public wineProducts: Product[] = [];
  public alcoholessProducts: Product[] = [];
  public snacksProducts: Product[] = [];
  public othersProduts: Product[]= [];

  public subscriptions: Subscription [] = [];

  constructor(
    private router: Router,
    private location: LocationService,
    private queries: QueriesService
  ) { }

  async ngOnInit() {
    try {
      await this.subscribeToLatLng();
    } catch {
      this.router.navigate(['/']);
    }
    finally {
      this.getDistributorId()
      .then(() => {
        this.getProductList();
      });
    }
  }

  private async subscribeToLatLng() {
    return new Promise<void>((resolve, reject) => {
      this.subscriptions.push(
        this.location.latLng$.subscribe(
          (coordenates: LatLng) => {
            if (coordenates) {
              this.latLng = coordenates
              resolve();
            } else {
              this.router.navigate(['/']);
              reject();
            }
          },
        )
      );
    });
  }

  private async getDistributorId() {
    const today: Date = new Date();
    const algorithm: string = 'NEAREST';

    if (this.latLng) {
      await this.queries.callDistributorQuery(today, algorithm, this.latLng.lat, this.latLng.lng)
      .then(() => this.distributorId = this.queries.getDistributorId());
    }
  }

  private async getProductList() {
    await this.queries.callProductListQuery(this.distributorId, undefined, null)
    .then(() =>  {
      this.productsList = this.queries.getProductsList();
      this.checkProductPerCategory();
    });
  }

  private checkProductPerCategory() {
    this.productsList.forEach((product: Product) => {
      const productCategory = product.productVariants[0].subtitle;
  
      switch (productCategory) {
        case (CategoryName.Beer):
          this.beerProducts.push(product);
          break;
        case (CategoryName.Distilled):
          this.distilledProducts.push(product);
          break;
        case (CategoryName.Wine):
          this.wineProducts.push(product);
          break;
        case (CategoryName.Alcoholess): 
          this.alcoholessProducts.push(product);
          break;
        case (CategoryName.Snacks):
          this.snacksProducts.push(product);
          break;
        default: 
          this.othersProduts.push(product);
      };
    });
  }

  ngOnDestroy() {
    this.location.clearLatLng();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}

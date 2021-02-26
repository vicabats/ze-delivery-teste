import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Distributor, DISTRIBUTOR } from '../interfaces/distributor-query';
import { Product, PRODUCTLIST } from '../interfaces/products-list-query';

@Injectable()
export class QueriesService {

  private distributorId: number;
  private productsList: Product[] = [];

  constructor(private apollo: Apollo) { }

  // Distributor
  public async callDistributorQuery(now: Date, algorithm: string, lat: string, lng: string) {
    return new Promise<void>((resolve, reject) => {
      this.searchDistributorQuery(now, algorithm, lat, lng).subscribe({
        next: ((distributorQuery) => {
          const distributor: Distributor = distributorQuery.data['pocSearch'][0];
          this.setDistributorId(distributor);
          resolve();
        }), error: () => reject()
      });
    })
  };

  private searchDistributorQuery(now: Date, algorithm: string, lat: string, long: string) {
    return this.apollo.watchQuery<any>({
      query: DISTRIBUTOR,
      variables: {
        now: now,
        algorithm: algorithm,
        lat: lat,
        long: long
      }
    }).valueChanges;
  }

  private setDistributorId(distributor: Distributor) {
    this.distributorId = distributor.id;
  }

  public getDistributorId() {
    return this.distributorId;
  }

  // Product
  public async callProductListQuery(id: number, categoryId: number, search: string) {
    return new Promise<void>((resolve, reject) => {
      this.searchProductListQuery(id, categoryId, search).subscribe({
        next: ((productsListQuery) => {
          const products: Product[] = productsListQuery.data['poc']['products'];
          this.setProductsList(products);
          resolve();
        }), error: () => reject()
      });
    });
  }

  private searchProductListQuery(id: number, categoryId: number, search: string) {
    return this.apollo.watchQuery<any>({
      query: PRODUCTLIST,
      variables: {
        id: id
      }
    }).valueChanges;
  }

  private setProductsList(productsList: Product[]) {
    this.productsList = productsList;
  }

  public getProductsList() {
    return this.productsList;
  }
}

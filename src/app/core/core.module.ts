import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { LocationService } from './services/location.service';
import { QueriesService } from './services/queries.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdgK0-9Fbe0IX6gwBpN9Ja1YFOvTgYEmo'
    })
  ],
  providers: [LocationService, QueriesService]
})
export class CoreModule { }

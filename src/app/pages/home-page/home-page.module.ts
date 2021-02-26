import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AutocompleteAddressInputModule } from 'src/app/components/autocomplete-address-input/autocomplete-address-input.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    AgmCoreModule,
    AutocompleteAddressInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      }
    ])
  ],
  exports: [HomePageComponent]
})
export class HomePageModule { }

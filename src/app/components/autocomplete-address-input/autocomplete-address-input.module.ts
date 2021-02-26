import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AutocompleteAddressInputComponent } from './autocomplete-address-input.component';

@NgModule({
  declarations: [AutocompleteAddressInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule,
  ],
  exports: [AutocompleteAddressInputComponent]
})
export class AutocompleteAddressInputModule { }

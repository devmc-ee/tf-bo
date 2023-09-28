import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgFor} from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { MenuComponent } from './menu.component';
import { MenuProvider } from './menu.provider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';

import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    NgFor,
    CdkAccordionModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  providers: [MenuProvider]
})
export class MenuModule { }

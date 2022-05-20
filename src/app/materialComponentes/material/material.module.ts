import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {
  MatAccordion,
  MatExpansionPanel,
  MatInputModule,
  MatLabel,
  MatMenuModule,
  MatListModule,
  MatOptionModule, MatPaginator, MatSelectModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HighchartsChartModule } from 'highcharts-angular';



const materialComponentes = [
  MatSidenavModule,
  MatToolbarModule,
  MatDividerModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatExpansionModule,
  MatMenuModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatPaginatorModule,
  MatListModule,
  MatAutocompleteModule,
  HighchartsChartModule
];

@NgModule({
  declarations: [],
  imports: [
    materialComponentes,
    CurrencyMaskModule
  ],
  exports: [materialComponentes, CurrencyMaskModule]
})
export class MaterialModule {
}

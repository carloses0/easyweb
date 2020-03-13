import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule, MatLabel} from '@angular/material';
import { MatCardModule } from '@angular/material/card';



const materialComponentes = [
  MatSidenavModule,
  MatToolbarModule,
  MatDividerModule,
  MatInputModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [
    materialComponentes,
  ],
  exports: [materialComponentes]
})
export class MaterialModule {
}

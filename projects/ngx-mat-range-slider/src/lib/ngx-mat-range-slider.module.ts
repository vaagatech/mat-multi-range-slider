import { NgModule } from '@angular/core';
import { NgxMatRangeSliderComponent } from './ngx-mat-range-slider.component';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [NgxMatRangeSliderComponent],
  imports: [
    MatSliderModule,
  ],
  exports: [NgxMatRangeSliderComponent]
})
export class NgxMatRangeSliderModule { }

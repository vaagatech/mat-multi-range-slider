import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {ThemePalette} from "@angular/material/core";

export interface RangeType {
  min: number;
  max: number;
}

@Component({
  selector: 'ngx-mat-range-slider',
  templateUrl: './ngx-mat-range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NgxMatRangeSliderComponent implements OnInit {
  isMinValueInit = true;
  isMaxValueInit = true;
  thumbLabel = true;
  @Input() minValue: number;
  @Input() maxValue: number;
  @Input() minColor: ThemePalette = 'accent';
  @Input() maxColor: ThemePalette = 'primary';
  @Input() showRuler: boolean = false;
  @Output() output = new EventEmitter<RangeType>();

  _max: number = 75;

  get max() {
    return this._max;
  }

  @Input()
  set max(m) {
    this._max = parseInt(m.toString());
  }

  _min: number = 18;

  get min() {
    return this._min;
  }

  @Input()
  set min(m) {
    this._min = parseInt(m.toString());
  }

  @Input()
  set value(v: { min: number, max: number }) {
    this.minValue = v.min;
    this.maxValue = v.max;
  }

  get rulerArray() {
    return [...Array(this.max - this.min).keys()].map(i => i + this.min);
  }

  @Input() formatLabel = (v) => v;

  ngOnInit(): void {
    if (!this.minValue) {
      this.minValue = this.min;
    }
    if (!this.maxValue) {
      this.maxValue = this.max;
    }
    this.isMinValueInit = (this.minValue === this.min);
    this.isMaxValueInit = (this.maxValue === this.max);
    this.output.emit({min: this.minValue, max: this.maxValue});
  }

  valueChange(a: MatSliderChange) {
    this.output.emit({min: this.minValue, max: this.maxValue});
  }

  minValueInput(a: MatSliderChange) {
    this.isMinValueInit = (a.value === this.min);
    if (a.value >= this.maxValue) {
      a.source.value = this.maxValue;
    }
  }

  maxValueInput(a: MatSliderChange) {
    this.isMaxValueInit = (a.value === this.max);
    if (a.value <= this.minValue) {
      a.source.value = this.minValue;
    }
  }

}

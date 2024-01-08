import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'heater',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heater.component.html',
  styleUrls: ['./heater.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaterComponent {

  @Input({ required: true }) minTemp: number = 0;
  @Input({ required: true }) maxTemp: number = 50;
  @Input({ required: true }) targetTemp: number = 0;

  minDegree: number = 220;
  maxDegree: number = 140;
  degree: number = 100;
  tempColor: 'black' | 'red' = 'black'
  errors: string[] = []

  constructor() { }

  ngOnChanges() {
    this.checkDegree()
  }

  checkDegree() {
    let diffDegree = 360 - (this.minDegree - this.maxDegree);
    let diffTemp = this.maxTemp - this.minTemp;

    this.errors = [];
    this.tempColor = 'black'
    if (this.maxTemp < this.minTemp || this.minTemp > this.maxTemp) {
      this.errors.push('Temperature bounds are reversed. We corrected them.');
      [this.minTemp, this.maxTemp] = [this.maxTemp, this.minTemp];
    }

    if (this.targetTemp <= this.minTemp || this.targetTemp >= this.maxTemp) {
      this.errors.push('Temperature is outside the valid range.');
      this.tempColor = 'red';
      this.degree = this.targetTemp <= this.minTemp ? this.minDegree : this.maxDegree;
    } else {
      const percDegree = (this.targetTemp - this.minTemp) / diffTemp;
      const deg = Math.ceil(percDegree * diffDegree);
      this.degree = this.minDegree + deg - 360;
    }
  }
}

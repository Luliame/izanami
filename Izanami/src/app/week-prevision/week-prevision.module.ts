import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeekPrevisionPageRoutingModule } from './week-prevision-routing.module';

import { WeekPrevisionPage } from './week-prevision.page';
import { WeatherPresenterComponent } from '../weather-presenter/weather-presenter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeekPrevisionPageRoutingModule
  ],
  declarations: [
    WeekPrevisionPage,
    WeatherPresenterComponent
  ]
})
export class WeekPrevisionPageModule {}

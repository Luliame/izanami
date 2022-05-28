import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeekPrevisionPageRoutingModule } from './week-prevision-routing.module';

import { WeekPrevisionPage } from './week-prevision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeekPrevisionPageRoutingModule
  ],
  declarations: [WeekPrevisionPage]
})
export class WeekPrevisionPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeekPrevisionPage } from './week-prevision.page';

const routes: Routes = [
  {
    path: '',
    component: WeekPrevisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeekPrevisionPageRoutingModule {}

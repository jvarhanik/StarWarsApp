import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LastViewedPage } from './last-viewed.page';

const routes: Routes = [
  {
    path: '',
    component: LastViewedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LastViewedPageRoutingModule {}

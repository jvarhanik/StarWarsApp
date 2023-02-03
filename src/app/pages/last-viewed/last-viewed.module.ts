import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LastViewedPageRoutingModule } from './last-viewed-routing.module';

import { LastViewedPage } from './last-viewed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LastViewedPageRoutingModule
  ],
  declarations: [LastViewedPage]
})
export class LastViewedPageModule {}

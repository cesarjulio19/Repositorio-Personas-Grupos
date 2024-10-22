import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RoutingBarComponent } from './components/routing-bar/routing-bar.component';



@NgModule({
  declarations: [RoutingBarComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[RoutingBarComponent]
})
export class SharedModule { }

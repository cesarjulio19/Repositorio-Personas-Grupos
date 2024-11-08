import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RoutingBarComponent } from './components/routing-bar/routing-bar.component';
import { PersonModalComponent } from './components/person-modal/person-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupSelectableComponent } from './components/group-selectable/group-selectable.component';
import { GroupSelectableSearchComponent } from './components/group-selectable-search/group-selectable-search.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';



@NgModule({
  declarations: [RoutingBarComponent,RegisterFormComponent,LoginFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[RoutingBarComponent,RegisterFormComponent,LoginFormComponent]
})
export class SharedModule { }

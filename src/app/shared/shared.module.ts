import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [MenuComponent, HomeComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  exports: [MenuComponent, HomeComponent],
})
export class SharedModule {}

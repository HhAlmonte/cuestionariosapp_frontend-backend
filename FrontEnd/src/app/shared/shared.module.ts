import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedRoutingModule,
    FormsModule
  ], exports: [
    LoadingComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

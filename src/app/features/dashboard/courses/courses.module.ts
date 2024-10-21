import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesModalComponent } from './courses-modal/courses-modal.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesModalComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }

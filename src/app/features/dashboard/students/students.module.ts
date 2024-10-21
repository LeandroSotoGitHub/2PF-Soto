import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsDialogComponent } from './students-dialog/students-dialog.component';
import { StudentsDetailComponent } from './students-detail/students-detail.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsDialogComponent,
    StudentsDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ],
  exports:[
    StudentsComponent
  ]
})
export class StudentsModule { }

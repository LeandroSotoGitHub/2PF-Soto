import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsModule } from './students/students.module';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StudentsModule
  ]
})
export class DashboardModule { }

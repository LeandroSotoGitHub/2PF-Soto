import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsDetailComponent } from './students-detail/students-detail.component';

const routes: Routes = [
  {path: '', component: StudentsComponent},
  {path:':id/detail', component: StudentsDetailComponent},
  {path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }

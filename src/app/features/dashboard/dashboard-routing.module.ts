import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'home',
    loadChildren: () => 
      import('./home/home.module').then((m) => m.HomeModule)
  },  
  {
    path: 'courses',
    loadChildren: () => 
      import('./courses/courses.module').then((m) => m.CoursesModule)
  },
  {
    path: 'classes',
    loadChildren: () => 
      import('./classes/classes.module').then((m) => m.ClassesModule)
  },
  {
    path: 'enrollments',
    loadChildren: () => 
      import('./enrollments/enrollments.module').then((m) => m.EnrollmentsModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

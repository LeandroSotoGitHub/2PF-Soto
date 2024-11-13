import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from './store/enrollment.actions';
import { Observable } from 'rxjs';
import { Enrollment } from './models';
import { selectCourses, selectEnrollments, selectStudents } from './store/enrollment.selectors';
import { Student } from '../students/models';
import { Courses } from '../courses/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {
  enrollments$: Observable<Enrollment[]>
  studentsOptions$: Observable<Student[]>
  coursesOptions$: Observable<Courses[]>

  enrollmentForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder
  ){
    this.enrollments$ = this.store.select(selectEnrollments)
    this.studentsOptions$ = this.store.select(selectStudents)
    this.coursesOptions$ = this.store.select(selectCourses)

    this.enrollmentForm = this.fb.group({
      courseId: [null, [Validators.required]],
      studentId: [null, [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadEnrollments())
    this.store.dispatch(EnrollmentActions.loadCoursesOptions())
    this.store.dispatch(EnrollmentActions.loadStudentsOptions())
  }

  onSubmit(){
    if(this.enrollmentForm.invalid){
      this.enrollmentForm.markAllAsTouched()
    } else{
      this.store.dispatch(EnrollmentActions.createEnrollment(this.enrollmentForm.value))
      this.enrollmentForm.reset()
    }
  }
}

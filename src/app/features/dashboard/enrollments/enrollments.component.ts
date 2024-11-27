import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from './store/enrollment.actions';
import { Observable } from 'rxjs';
import { Enrollment } from './models';
import { selectCourses, selectEnrollments, selectEnrollmentsError, selectEnrollmentsLoading, selectStudents } from './store/enrollment.selectors';
import { Student } from '../students/models';
import { Courses } from '../courses/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})

export class EnrollmentsComponent implements OnInit {
  enrollments$: Observable<Enrollment[]>
  studentsOptions$: Observable<Student[]>
  coursesOptions$: Observable<Courses[]>
  loadServiceErrors$: Observable<unknown>
  EnrollmentsLoading$: Observable<boolean>

  enrollmentForm: FormGroup
  displayedColumns: string[] = ['id', 'studentName', 'courseName', 'actions'];
  dataSource = new MatTableDataSource<Enrollment>();

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ){
    this.enrollments$ = this.store.select(selectEnrollments)
    this.studentsOptions$ = this.store.select(selectStudents)
    this.coursesOptions$ = this.store.select(selectCourses)
    this.loadServiceErrors$ = this.store.select(selectEnrollmentsError)
    this.EnrollmentsLoading$ = this.store.select(selectEnrollmentsLoading)

    this.enrollmentForm = this.fb.group({
      courseId: [null, [Validators.required]],
      studentId: [null, [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadEnrollments())
    this.store.dispatch(EnrollmentActions.loadEnrollmentsAndStudentsOptions())
    this.onError()
    this.store.dispatch(EnrollmentActions.loadEnrollments())
    this.enrollments$.subscribe((enrollments) => {
      this.dataSource.data = enrollments
      this.dataSource.paginator = this.paginator
    });
  }

  onSubmit(){
    if(this.enrollmentForm.invalid){
      this.enrollmentForm.markAllAsTouched()
    } else{
      this.store.dispatch(EnrollmentActions.createEnrollment(this.enrollmentForm.value))
      this.enrollmentForm.reset()
    }
  }

  onError() {
    this.loadServiceErrors$.subscribe((error) => {
      if (error) {
        this._snackBar.open('Ocurrió un error', 'Cerrar', { duration: 3000 })
      }
    })
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {
      this.store.dispatch(EnrollmentActions.deleteEnrollment({ id }));
      this._snackBar.open('Inscripción eliminada exitosamente.', 'Cerrar', {
        duration: 3000,
      });
    }
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
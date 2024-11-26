import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, delay, map } from 'rxjs/operators';
import { forkJoin, of, pipe } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { CourseService } from 'src/app/core/services/course.service';

@Injectable()
export class EnrollmentEffects {
  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap((action) =>
        this.enrollmentService.getEnrollments().pipe(
          map((response) =>
            EnrollmentActions.loadEnrollmentsSucess({ data: response })
          ),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  createEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) =>
        this.enrollmentService
          .createEnrollment({
            courseId: action.courseId,
            studentId: action.studentId,
          })
          .pipe(
            map((data) => EnrollmentActions.createEnrollmentSucess({ data })),
            catchError((error) =>
              of(EnrollmentActions.createEnrollmentFailure({ error }))
            )
          )
      )
    );
  });

  createEnrollmentSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollmentSucess),
      map(() => EnrollmentActions.loadEnrollments())
    );
  });

  loadStudentsAndEnrollmentsOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollmentsAndStudentsOptions),
      concatMap(() =>
        forkJoin([
          this.courseService.getCourses(),
          this.studentsService.getStudents(),
        ]).pipe(
          map(([courses, students]) =>
            EnrollmentActions.loadEnrollmentsAndStudentsOptionsSuccess({
              courses,
              students,
            })
          ),
          catchError((error) =>
            of(
              EnrollmentActions.loadEnrollmentsAndStudentsOptionsFailure({
                error,
              })
            )
          )
        )
      )
    );

    
  });
  
  constructor(
    private actions$: Actions,
    private enrollmentService: EnrollmentService,
    private studentsService: StudentsService,
    private courseService: CourseService
  ) {}
}

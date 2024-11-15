import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentService } from '../../../../core/services/enrollment.service';

@Injectable()
export class EnrollmentEffects {


  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.loadEnrollments),
      concatMap((action) => this.enrollmentService.getEnrollments()
      .pipe(
        map((response) => EnrollmentActions.loadEnrollmentsSucess({data: response})),
        catchError((error) => of(EnrollmentActions.loadEnrollmentsFailure({ error })))
      )
    ))
  });

  constructor(
    private actions$: Actions,
    private enrollmentService:EnrollmentService
  ) {}
}

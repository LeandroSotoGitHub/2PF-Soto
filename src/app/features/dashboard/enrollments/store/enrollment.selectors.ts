import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';

export const selectEnrollmentState = createFeatureSelector<fromEnrollment.State>(
  fromEnrollment.enrollmentFeatureKey
);

export const selectEnrollments = createSelector(selectEnrollmentState, (state) => state.enrollments)
export const selectCourses = createSelector(selectEnrollmentState, (state) => state.courses)
export const selectStudents = createSelector(selectEnrollmentState, (state) => state.students)
export const selectEnrollmentsError = createSelector(selectEnrollmentState, (state) => state.loadEnrollmentsError)
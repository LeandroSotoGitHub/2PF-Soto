import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Sucess': props<{ data:Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error:unknown }>(),
    'Load Courses Options': emptyProps(),
    'Load Students Options': emptyProps(),
    'Create Enrollment': props<{ studentId: string, courseId: string }>(),
  }
});

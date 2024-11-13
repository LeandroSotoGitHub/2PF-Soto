import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Courses Options': emptyProps(),
    'Load Students Options': emptyProps(),
    'Create Enrollment': props<{ studentId: string, courseId: string }>(),
  }
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models';
import { Student } from '../../students/models';
import { Courses } from '../../courses/models';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Sucess': props<{ data:Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error:unknown }>(),

    
    'Create Enrollment': props<{ studentId: string, courseId: string }>(),
    'Create Enrollment Sucess': props<{ data: Enrollment }>(),
    'Create Enrollment Failure': props<{ error: unknown}>(),



    'Load Enrollments and Students Options': emptyProps(),
    'Load Enrollments and Students Options Success': props<{students: Student[], courses: Courses[]}>(),
    'Load Enrollments and Students Options Failure': props<{error: Error}>(),

    'Delete Enrollment': props<{id: string}>(),
    'Delete Enrollment Failure': props<{error: any}>(),
    'Delete Enrollment Success': props<{id: string}>(),
  }
});

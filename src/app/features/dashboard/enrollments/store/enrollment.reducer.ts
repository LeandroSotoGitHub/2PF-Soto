import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';
import { Student } from '../../students/models';
import { Courses } from '../../courses/models';
import { generateUniqueId } from 'src/app/shared/utils';

export const enrollmentFeatureKey = 'enrollment';


const ENROLLMENTS_DB: Enrollment[] = [
  {
    id: 'a2n3',
    studentId: 'asd2',
    courseId: '123w',
  }
]

const STUDENTS_DB: Student[] = [
  {
    createdAt:new Date(),
    firstName: 'capo',
    id:1234,
    lastName: 'peque',
    mail:'mail@mail.com'
  },
  {
    createdAt:new Date(),
    firstName: 'raro',
    id:1334,
    lastName: 'rarp',
    mail:'mail@msn.com'
  },
  {
    createdAt:new Date(),
    firstName: 'river',
    id:2234,
    lastName: 'carp',
    mail:'mail@monumental.com'
  },
]


const COURSES_DB: Courses[] = [
  {
    id: 3123,
    endDate: new Date(),
    startDate: new Date(),
    name: 'loquepinteinscribiteporfavor',
  }
]


export interface State {
  enrollments: Enrollment[],
  students: Student[],
  courses: Courses[]
}

export const initialState: State = {
  enrollments:[],
  students: [],
  courses: []
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, state => {
    return {
      ...state,
      enrollments: [...ENROLLMENTS_DB]
    }
  }),
  on(EnrollmentActions.loadCoursesOptions, state => {
    return{
      ...state,
      courses:[...COURSES_DB]
    }
  }),
  on(EnrollmentActions.loadStudentsOptions, state =>{
    return{
      ...state,
      students:[...STUDENTS_DB]
    }
  }),
  on(EnrollmentActions.createEnrollment, (state, action) => {
    return {
      ...state,
      enrollments: [...ENROLLMENTS_DB, { id:'12221', studentId: action.studentId, courseId: action.courseId }]
    }
  })
);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});


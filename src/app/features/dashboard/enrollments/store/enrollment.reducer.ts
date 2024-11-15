import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';
import { Student } from '../../students/models';
import { Courses } from '../../courses/models';
import { generateToken } from 'src/app/shared/utils';

export const enrollmentFeatureKey = 'enrollment';


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
  isLoading: Boolean
  enrollments: Enrollment[]
  students: Student[]
  courses: Courses[]
  loadEnrollmentsError: unknown 
}

export const initialState: State = {
  isLoading: false,
  enrollments:[],
  students: [],
  courses: [],
  loadEnrollmentsError: null
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, state => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(EnrollmentActions.loadEnrollmentsSucess, (state, action) => {
    return{
      ...state,
      enrollments: action.data,
      loadEnrollmentsError:null,
      isLoading: false
    }
  }),
  on(EnrollmentActions.loadEnrollmentsFailure, (state,action)=>{
    return{
      ...state,
      ...initialState,
      loadEnrollmentsError: action.error
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
      enrollments: [
        ...state.enrollments, 
        { id:generateToken(5) , studentId: action.studentId, courseId: action.courseId }
      ]
    }
  })
);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});


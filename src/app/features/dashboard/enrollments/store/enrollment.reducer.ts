import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';
import { Student } from '../../students/models';
import { Courses } from '../../courses/models';
import { generateToken } from 'src/app/shared/utils';

export const enrollmentFeatureKey = 'enrollment';



export interface State {
  isLoading: boolean
  enrollments: Enrollment[]
  studentsOptions: Student[]
  coursesOptions: Courses[]
  loadEnrollmentsError: unknown 
}

export const initialState: State = {
  isLoading: false,
  loadEnrollmentsError: null,
  enrollments:[],
  studentsOptions: [],
  coursesOptions: [],
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.createEnrollment, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
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
      loadEnrollmentsError: action.error,
      isLoading: false
    }
  }),
 on(EnrollmentActions.loadEnrollmentsAndStudentsOptions, (state) => {
  return {
    ...state,
    isLoading: true
  }
 }),
 on(EnrollmentActions.loadEnrollmentsAndStudentsOptionsSuccess, (state, action) => {
  return {
    ...state,
    loadEnrollmentsError: null,
    isLoading: false,
    studentsOptions: action.students,
    coursesOptions: action.courses
  }
 }),
 on(EnrollmentActions.loadEnrollmentsAndStudentsOptionsFailure, (state, {error}) => {
  return {
    ...state,
    isLoading: false,
    loadEnrollmentsError: error
  }
 }),
 on(EnrollmentActions.deleteEnrollmentSuccess, (state, {id}) =>({
   ...state,
   enrollments: state.enrollments.filter(enrollment => enrollment.id !== id),
 }),
//  on(EnrollmentActions.deleteEnrollmentFailure, (state, {error}) =>({
//   ...state,
//   error
//  }))
));

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});


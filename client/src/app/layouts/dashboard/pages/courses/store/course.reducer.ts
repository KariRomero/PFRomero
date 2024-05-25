import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { ICourse } from '../models';
import { studentsFeature } from '../../students/store/students.reducer';

export const courseFeatureKey = 'course';

export interface State {
  courses:ICourse[],
  isLoading:boolean,
  error:unknown  

}

export const initialState: State = {
  courses:[],
  isLoading:false,
  error:null

};

export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCourses, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      courses:action.data
    }
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),
  
  
  on(CourseActions.createCourse, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(CourseActions.createCourseSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      courses:[...state.courses,action.data]
    }
  }),
  on(CourseActions.createCourseFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),
  
  
  on(CourseActions.updateCourse, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(CourseActions.updateCourseSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      courses:state.courses.map((c)=>c.id===action.data.id ? action.data : c)
    }
  }),
  on(CourseActions.updateCourseFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),


  on(CourseActions.deleteCourseById, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(CourseActions.deleteCourseByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      courses:state.courses.filter((c)=>c.id!=action.data.id)
    }
  }),
  on(CourseActions.deleteCourseByIdFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),


);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});


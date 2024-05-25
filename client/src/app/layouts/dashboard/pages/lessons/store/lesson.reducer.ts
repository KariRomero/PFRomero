import { createFeature, createReducer, on } from '@ngrx/store';
import { LessonActions } from './lesson.actions';
import { ILesson } from '../models';

export const lessonFeatureKey = 'lesson';

export interface State {
  lessons: ILesson[],
  isLoading:boolean,
  error:unknown

}

export const initialState: State = {
  lessons:[],
  isLoading:false,
  error:null

};

export const reducer = createReducer(
  initialState,
  on(LessonActions.loadLessons, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(LessonActions.loadLessonsSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      lessons:action.data
    }
  }),
  on(LessonActions.loadLessonsFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),
  
  
  on(LessonActions.createLesson, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(LessonActions.createLessonSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      lessons:[...state.lessons,action.data]
    }
  }),
  on(LessonActions.createLessonFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),


  on(LessonActions.updateLesson, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(LessonActions.updateLessonSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      lessons:state.lessons.map((l)=>l.id===action.data.id ? action.data : l)
    }
  }),
  on(LessonActions.updateLessonFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),
  
  
  on(LessonActions.deleteLessonById, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(LessonActions.deleteLessonByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      lessons:state.lessons.filter((l)=>l.id!=action.data.id)
    }
  }),
  on(LessonActions.deleteLessonByIdFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),


);

export const lessonFeature = createFeature({
  name: lessonFeatureKey,
  reducer,
});


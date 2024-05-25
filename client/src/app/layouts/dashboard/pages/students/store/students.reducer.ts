import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentsActions } from './students.actions';
import { IStudent } from '../models';

export const studentsFeatureKey = 'students';

export interface State {
  students: IStudent[],
  isLoading:boolean,
  error:unknown

}

export const initialState: State = {
  students:[],
  isLoading:false,
  error:null

};

export const reducer = createReducer(
  initialState,
  on(StudentsActions.loadStudentss, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(StudentsActions.loadStudentssSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      students:action.data
    }
  }),
  on(StudentsActions.loadStudentssFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),
  
  
  on(StudentsActions.createStudent, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(StudentsActions.createStudentSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      students:[...state.students,action.data]
    }
  }),
  on(StudentsActions.createStudentFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),


  on(StudentsActions.updateStudent, state => ({
    ...state,
    isLoading: true
  })),
  on(StudentsActions.updateStudentSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    students: state.students.map(s => s.id === action.data.id ? action.data : s)
  })),
  on(StudentsActions.updateStudentFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
  })),
  
  
  on(StudentsActions.deleteStudentById, state => {
    return{
      ...state,
      isLoading:true
    }
  }),
  on(StudentsActions.deleteStudentByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading:false,
      students:state.students.filter((s)=>s.id!=action.data.id)
    }
  }),
  on(StudentsActions.deleteStudentsByIdFailure, (state, action) => {
    return{
      ...state,
      error:action.error,
      isLoading:false
    }
  }),

);

export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
});


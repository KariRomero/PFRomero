import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudents from './students.reducer';

export const selectStudentsState = createFeatureSelector<fromStudents.State>(
  fromStudents.studentsFeatureKey
);

export const selectStudents = createSelector(selectStudentsState,(state)=>{
  return state.students
});

export const selectStudentsError = createSelector(selectStudentsState,(state)=>{
  return state.error
});

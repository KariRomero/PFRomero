import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentsActions } from './students.actions';

export const studentsFeatureKey = 'students';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(StudentsActions.loadStudentss, state => state),
  on(StudentsActions.loadStudentssSuccess, (state, action) => state),
  on(StudentsActions.loadStudentssFailure, (state, action) => state),
);

export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
});


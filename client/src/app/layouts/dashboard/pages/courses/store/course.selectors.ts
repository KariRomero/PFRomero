import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);

export const selectCourses = createSelector(selectCourseState,(state)=>{
  return state.courses
});

export const selectCoursesError = createSelector(selectCourseState,(state)=>{
  return state.error
});

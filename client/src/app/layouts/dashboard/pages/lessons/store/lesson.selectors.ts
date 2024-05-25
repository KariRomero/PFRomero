import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLesson from './lesson.reducer';

export const selectLessonState = createFeatureSelector<fromLesson.State>(
  fromLesson.lessonFeatureKey
);

export const selectLessons = createSelector(selectLessonState,(state)=>{
  return state.lessons
});

export const selectLessonsError = createSelector(selectLessonState,(state)=>{
  return state.error
})

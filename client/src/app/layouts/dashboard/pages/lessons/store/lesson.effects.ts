import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { LessonActions } from './lesson.actions';
import { LessonsService } from '../lessons.service';


@Injectable()
export class LessonEffects {

  loadLessons$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(LessonActions.loadLessons),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.lessonsService.getLessons().pipe(
          map(data => LessonActions.loadLessonsSuccess({ data })),
          catchError(error => of(LessonActions.loadLessonsFailure({ error }))))
      )
    );
  });
  
  createLessons$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(LessonActions.createLesson),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.lessonsService.addLessons(action.payload).pipe(
          map(data => LessonActions.createLessonSuccess({ data })),
          catchError(error => of(LessonActions.createLessonFailure({ error }))))
      )
    );
  });
  
  updateLessons$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(LessonActions.updateLesson),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.lessonsService.updateLesson(action.id,action.payload).pipe(
          map(data => LessonActions.updateLessonSuccess({ data })),
          catchError(error => of(LessonActions.updateLessonFailure({ error }))))
      )
    );
  });
  
  deleteLessonsById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(LessonActions.deleteLessonById),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.lessonsService.deleteLesson(action.id).pipe(
          map(data => LessonActions.deleteLessonByIdSuccess({ data })),
          catchError(error => of(LessonActions.deleteLessonByIdFailure({ error }))))
      )
    );
  });




  constructor(private actions$: Actions,
    private lessonsService:LessonsService
  ) {}
}

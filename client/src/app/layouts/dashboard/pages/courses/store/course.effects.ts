import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CourseActions } from './course.actions';
import { CoursesService } from '../courses.service';


@Injectable()
export class CourseEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadCourses),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.coursesService.getCourses().pipe(
          map(data => CourseActions.loadCoursesSuccess({ data })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error }))))
      )
    );
  });
  
  createCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.createCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.coursesService.addCourses(action.payload).pipe(
          map(data => CourseActions.createCourseSuccess({ data })),
          catchError(error => of(CourseActions.createCourseFailure({ error }))))
      )
    );
  });
  
  updateCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.updateCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.coursesService.updateCourse(action.id,action.payload).pipe(
          map(data => CourseActions.updateCourseSuccess({ data })),
          catchError(error => of(CourseActions.updateCourseFailure({ error }))))
      )
    );
  });

  
  deleteCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.deleteCourseById),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.coursesService.deleteCourse(action.id).pipe(
          map(data => CourseActions.deleteCourseByIdSuccess({ data })),
          catchError(error => of(CourseActions.deleteCourseByIdFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}

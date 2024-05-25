import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StudentsActions } from './students.actions';
import { StudentsService } from '../students.service';


@Injectable()
export class StudentsEffects {

  loadStudentss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentsActions.loadStudentss),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.studentsService.getStudents().pipe(
          map(data => StudentsActions.loadStudentssSuccess({ data })),
          catchError(error => of(StudentsActions.loadStudentssFailure({ error }))))
      )
    );
  });
  
  createStudentss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentsActions.createStudent),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.studentsService.addStudents(action.payload).pipe(
          map(data => StudentsActions.createStudentSuccess({ data })),
          catchError(error => of(StudentsActions.createStudentFailure({ error }))))
      )
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      concatMap((action) =>
        this.studentsService.updateStudent(action.id, action.payload).pipe(
          map(data => StudentsActions.updateStudentSuccess({ data })),
          catchError(error => of(StudentsActions.updateStudentFailure({ error })))
        )
      )
    );
  });
  
  deleteStudentById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentsActions.deleteStudentById),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.studentsService.deleteStudent(action.id).pipe(
          map(data => StudentsActions.deleteStudentByIdSuccess({ data })),
          catchError(error => of(StudentsActions.deleteStudentsByIdFailure({ error }))))
      )
    );
  });

  

  constructor(private actions$: Actions,
    private studentsService:StudentsService
  ) {}
}

import { Component, OnInit } from '@angular/core';
import { LessonsService } from './lessons.service';
import { ILesson } from './models';
import { MatDialog } from '@angular/material/dialog';
import { LessonsDialogComponent } from './lessons-dialog/lessons-dialog.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLessons, selectLessonsError } from './store/lesson.selectors';
import { LessonActions } from './store/lesson.actions';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent implements OnInit {
  constructor(
    private lessonsService:LessonsService,
    private matDialog:MatDialog,
    private store:Store
  ){
    this.lessons$ = this.store.select(selectLessons);
    this.error$ = this.store.select(selectLessonsError);
  }

  displayedColumns:string[] = [
    'clase',
    'horario',
    'acciones'
  ]

   lessons$: Observable<ILesson[]>;
  error$:Observable<unknown>;

  ngOnInit(): void {
    this.store.dispatch(LessonActions.loadLessons());
  }

  openDialog(editingLesson?:ILesson):void{
    this.matDialog
    .open(LessonsDialogComponent,{
      data:editingLesson
    })
    .afterClosed()
    .subscribe({
      next:(result)=>{
        if(result){
          if(editingLesson){
            this.store.dispatch(LessonActions.updateLesson({id:editingLesson.id,payload:result}));
          } else{
           this.store.dispatch(LessonActions.createLesson({ payload:result}))
          }
        }
      }
    })
  }

  onDelete(id:number): void {
    if(confirm('¿Está seguro de eliminar clase?')) {
     this.store.dispatch(LessonActions.deleteLessonById({id}))
    }
  }

}

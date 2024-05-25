import { Component, OnInit } from '@angular/core';
import { ICourse } from './models';
import { CoursesService } from './courses.service';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCourses, selectCoursesError } from './store/course.selectors';
import { CourseActions } from './store/course.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  constructor(
    private coursesService: CoursesService,
    private matDialog:MatDialog,
    private store: Store
  ){
    this.courses$ = this.store.select(selectCourses);
    this.error$ = this.store.select(selectCoursesError);
  }

  displayedColumns:string[] = [
    'curso',
    'turno',
    'acciones'
  ]

  courses$:Observable<ICourse[]>;
  error$:Observable<unknown>;

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses()); 
  }

  openDialog(editingCourse?:ICourse):void{
    this.matDialog
    .open(CoursesDialogComponent,{
      data:editingCourse
    })
    .afterClosed()
    .subscribe({
      next:(result)=>{
        if(result){
          if(editingCourse){
            this.store.dispatch(CourseActions.updateCourse({id:editingCourse.id,payload:result}))
          } else{
           this.store.dispatch(CourseActions.createCourse({payload:result}))
          }
        }
      }
    })
  }

  onDelete(id:number): void {
    if(confirm('¿Está seguro de eliminar curso?')) {
      this.store.dispatch(CourseActions.deleteCourseById({id}))
    }
  }

}

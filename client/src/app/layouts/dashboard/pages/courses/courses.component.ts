import { Component, OnInit } from '@angular/core';
import { ICourse } from './models';
import { CoursesService } from './courses.service';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  constructor(
    private coursesService: CoursesService,
    private matDialog:MatDialog
  ){}

  displayedColumns:string[] = [
    'curso',
    'turno',
    'acciones'
  ]

  courses : ICourse[]=[]

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe({
      next:(courses)=>{
        this.courses = courses 
      }
    })    
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
            this.coursesService.updateCourse(editingCourse.id,result).subscribe({
              next:()=>{
                this.courses = this.courses.map((c)=>c.id===editingCourse.id ? {...c,...result} : c)
              }
            });
          } else{
            this.coursesService.addCourses(result).subscribe({
              next:(courseCreado)=>{
                this.courses = [...this.courses,courseCreado]
              }
            });
          }
        }
      }
    })
  }

  onDelete(id:number): void {
    if(confirm('¿Está seguro de eliminar curso?')) {
      this.coursesService.deleteCourse(id).subscribe({
        next:()=>{
          this.courses = this.courses.filter(c=>c.id != id)
        }
      });
    }
  }

}

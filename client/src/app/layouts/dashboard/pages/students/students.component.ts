import { Component, OnInit } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './students-dialog/students-dialog.component';
import { StudentsService } from './students.service';
import { Store } from '@ngrx/store';
import { StudentsActions } from './store/students.actions';
import { Observable } from 'rxjs';
import { selectStudents, selectStudentsError } from './store/students.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  displayedColumns : string[] = [
    'nombre',
    'email',
    'curso',
    'turno',
    'createdAt',
    'acciones'
  ]

  // students : IStudent[] = [];
  students$ : Observable<IStudent[]>;
  error$:Observable<unknown>;

  constructor(
    private matDialog: MatDialog, 
    private studentsService:StudentsService,
    private store: Store
  ){
    this.students$ = this.store.select(selectStudents);
    this.error$ = this.store.select(selectStudentsError);

  };

  ngOnInit(): void {
    this.store.dispatch(StudentsActions.loadStudentss());   
   
    // this.studentsService.getStudents().subscribe({
    //   next:(students)=>{
    //     this.students = students
    //   }
    // })
  }

  openDialog(editingStudent?: IStudent): void {
    this.matDialog
      .open(StudentsDialogComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingStudent) {
              this.store.dispatch(StudentsActions.updateStudent({ id: editingStudent.id, payload: result }));
            } else {
              this.store.dispatch(StudentsActions.createStudent({ payload: result }));
            }
          }
        }
      });
  }
  
  // openDialog(editingStudent?: IStudent): void {
  //   this.matDialog
  //     .open(StudentsDialogComponent, { data: editingStudent })
  //     .afterClosed()
  //     .subscribe({
  //       next: (result) => {
  //         if (result) {
  //           if (editingStudent) {
  //             this.studentsService.updateStudent(editingStudent.id, result).subscribe({
  //               next:()=>{
  //                 this.students = this.students.map((s)=>s.id === editingStudent.id ? {...s,...result} : s)
  //               }
  //             })
  //           } else {
  //             this.studentsService.addStudents(result).subscribe({
  //               next:(studentCreado)=>{
  //                 this.students = [...this.students, studentCreado]
  //               }
  //             })
  //           }
  //         }
  //       }
  //     });
  // }
  

  onDelete(id: number): void {
    if (confirm('¿Está seguro de eliminar usuario?')) {
      this.store.dispatch(StudentsActions.deleteStudentById({id}))
      // this.studentsService.deleteStudent(id).subscribe({
      //   next: () => {
      //     this.students = this.students.filter(student => student.id !== id);
      //   }
      // });
    }
  }
  

}

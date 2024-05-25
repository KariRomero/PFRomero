import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrl: './students-detail.component.scss'
})
export class StudentsDetailComponent {

  student$: Observable<IStudent | undefined>

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentsService){
    this.student$ = this.studentService.getStudentById(this.activatedRoute.snapshot.params['id'])
  }

}

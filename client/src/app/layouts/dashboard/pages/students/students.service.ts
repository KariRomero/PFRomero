import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { IStudent, CreateStudentPayload } from "./models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Injectable({ providedIn:'root'})
export class StudentsService{
  constructor(private httpClient:HttpClient){}  

    getStudents(): Observable<IStudent[]>{
        return this.httpClient.get<IStudent[]>(environment.baseAPIURL + '/students');
    }

    getStudentById(id:number):Observable<IStudent | undefined>{
      return this.httpClient.get<IStudent>(`${environment.baseAPIURL}/students/${id}`);
    }

    addStudents(payload:CreateStudentPayload): Observable<IStudent>{
      return this.httpClient.post<IStudent>(`${environment.baseAPIURL}/students`,payload)
    }

    deleteStudent(id: number) {
      return this.httpClient.delete<IStudent>(`${environment.baseAPIURL}/students/${id}`)      
    }

    updateStudent(id: number, data: Partial<IStudent>) {
      return this.httpClient.put<IStudent>(`${environment.baseAPIURL}/students/${id}`, data);
    }

}
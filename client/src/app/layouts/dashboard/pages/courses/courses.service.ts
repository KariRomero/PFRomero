import { Injectable } from "@angular/core";
import { CreateCoursePayload, ICourse } from "./models";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Injectable({providedIn:'root'})
export class CoursesService{
    constructor(private httpClientt : HttpClient){}

    getCourses():Observable<ICourse[]>{
        return this.httpClientt.get<ICourse[]>(environment.baseAPIURL + '/courses');
    }

    addCourses(payload:CreateCoursePayload) : Observable<ICourse>{
        return this.httpClientt.post<ICourse>(`${environment.baseAPIURL}/courses`,payload)        
    }

    deleteCourse(id:number){
        return this.httpClientt.delete<ICourse>(`${environment.baseAPIURL}/courses/${id}`)
    }

    updateCourse(id:number,data:Partial<ICourse>){
        return this.httpClientt.put<ICourse>(`${environment.baseAPIURL}/courses/${id}`,data)        
    }
}
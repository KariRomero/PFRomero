import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CreateLessonPayload, ILesson } from "./models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Injectable({providedIn:'root'})
export class LessonsService{
    constructor(private httpClient:HttpClient){}
   
    getLessons():Observable<ILesson[]>{
        return this.httpClient.get<ILesson[]>(environment.baseAPIURL + '/lessons');
    }

    addLessons(payload:CreateLessonPayload) : Observable<ILesson>{
        return this.httpClient.post<ILesson>(`${environment.baseAPIURL}/lessons`,payload)
    }

    deleteLesson(id:number){
        return this.httpClient.delete<ILesson>(`${environment.baseAPIURL}/lessons/${id}`)
    }

    updateLesson(id:number,data:Partial<ILesson>){
        return this.httpClient.put<ILesson>(`${environment.baseAPIURL}/lessons/${id}`,data)
    }
}
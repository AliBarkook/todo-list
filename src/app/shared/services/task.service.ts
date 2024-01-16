import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpBaseService } from "./http-base.service";
import { Observable } from "rxjs";
import { ICreateTask, IGetTask } from "../interfaces/task.interface";

@Injectable({
    providedIn: 'root'
})

export class TaskService extends HttpBaseService {


    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    getAllTasks(): Observable<any> {
        return this.http.get(`${this.apiUrl}/tasks`)
    }

    createTask(task: ICreateTask): Observable<IGetTask> {
        return this.http.post<IGetTask>(`${this.apiUrl}/tasks`, task)
    }

    getTasksByListId(listId: string): Observable<IGetTask[]> {
        return this.http.get<IGetTask[]>(`${this.apiUrl}/tasks/query/${listId}`)
    }



    getTaskById(taskId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/tasks/${taskId}`)
    }

    updateTask(taskId: string, task: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/tasks/${taskId}`, task)
    }

    deleteTask(taskId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/tasks/${taskId}`)
    }

    getDoneTasks(): Observable<any> {
        return this.http.get(`${this.apiUrl}/compeleted`)
    }
    
}
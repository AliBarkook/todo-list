import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpBaseService } from "./http-base.service";
import { Observable } from "rxjs";
import { ICreateList, IGetList } from "../interfaces/list.interface";

@Injectable({
    providedIn: 'root'
})

export class ListService extends HttpBaseService {


    constructor(
        private http: HttpClient,
    ) {
        super();
    }




    getMainList(): Observable<IGetList> {
        return this.http.get<IGetList>(`${this.apiUrl}/mainList`)
    }

    getAllLists(): Observable<IGetList[]> {
        return this.http.get<IGetList[]>(`${this.apiUrl}/lists`)
    }

    getlistById(listId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/lists/${listId}`)
    }

    updateList(listId: string, list: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/lists/${listId}`, list)
    }

    createList(list: ICreateList): Observable<any> {
        return this.http.post(`${this.apiUrl}/lists`, list)
    }

    deleteList(listId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/lists/${listId}`)
    }
    
}
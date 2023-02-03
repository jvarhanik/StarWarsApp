import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface ApiResult{
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMovies(page = 1): Observable<ApiResult>{
    return this.http.get<ApiResult>(`${environment.baseUrl}/films/`);
  }
  getMovieDetails(id: any){
    return this.http.get(`${environment.baseUrl}/films/${id}`)
  }
  getChars(id: any): Observable<ApiResult>{
    return this.http.get<ApiResult>(`${environment.baseUrl}/people/?page=${id}`)
  }
  getCharDetails(id: any){
    return this.http.get(`${environment.baseUrl}/people/${id}`)
  }
}

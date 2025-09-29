import { Injectable } from '@angular/core';

//http
import { HttpClient } from '@angular/common/http';

//observable
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuarios {

  constructor(private http: HttpClient) {}
  
}

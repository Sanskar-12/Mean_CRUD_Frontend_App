import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { getAllStudentsResponse } from '../model/response.type';

@Injectable({
  providedIn: 'root',
})
export class Api {
  http = inject(HttpClient);

  baseUrl = `http://localhost:4000/api/v1`;

  getStudents() {
    const url = `${this.baseUrl}/get/all`;
    return this.http.get<getAllStudentsResponse>(url);
  }
}

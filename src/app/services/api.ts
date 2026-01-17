import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  addStudentRequest,
  createStudentResponse,
  getAllStudentsResponse,
  Student,
} from '../model/response.type';

@Injectable({
  providedIn: 'root',
})
export class Api {
  http = inject(HttpClient);

  baseUrl = `http://localhost:4000/api/v1`;

  // Get All Student api call
  getStudents() {
    const url = `${this.baseUrl}/get/all`;
    return this.http.get<getAllStudentsResponse>(url);
  }

  // Create Student api call
  addStudent(student: addStudentRequest) {
    const url = `${this.baseUrl}/create`;
    return this.http.post<createStudentResponse>(url, student);
  }
}

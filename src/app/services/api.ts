import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  addStudentRequest,
  createStudentResponse,
  deleteStudentResponse,
  getAllStudentsResponse,
  getStudentDetailsResponse,
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

  // Delete Student api call
  deleteStudent(studentId: string) {
    const url = `${this.baseUrl}/delete/${studentId}`;
    return this.http.delete<deleteStudentResponse>(url);
  }

  // Get Student By Id api call
  getStudentById(studentId: string) {
    const url = `${this.baseUrl}/get/${studentId}`;
    return this.http.get<getStudentDetailsResponse>(url);
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Api } from './services/api';
import { catchError } from 'rxjs';
import { Student } from './model/response.type';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('student-portal');

  // injecting the service to make api calls
  apiService = inject(Api);

  // intialising form
  studentForm: FormGroup;
  students = signal<Student[]>([]);

  // form onsubmit function
  onSubmit() {
    console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;

      this.apiService
        .addStudent(studentData)
        .pipe(
          catchError((err) => {
            console.log(err);
            throw err;
          }),
        )
        .subscribe((res) => {
          console.log(res);
          this.getAllStudents();
          this.studentForm.reset();
        });
    }
  }

  getStudentDetails(studentId: string) {
    this.apiService
      .getStudentById(studentId)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        }),
      )
      .subscribe((res) => {
        console.log(res);
        // patchValue is used to fill the data into the form
        this.studentForm.patchValue({
          name: res.data.name,
          age: res.data.age,
          email: res.data.email,
          studentClass: res.data.studentClass,
          address: res.data.address,
          phone: res.data.phone,
        });
      });
  }

  deleteStudentHandler(studentId: string) {
    this.apiService
      .deleteStudent(studentId)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        }),
      )
      .subscribe((res) => {
        console.log(res);
        this.getAllStudents();
      });
  }

  // this will run when the component will initialise
  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.apiService.getStudents().subscribe({
      next: (res) => {
        this.students.set(res.data);
      },
      error: (err) => console.error(err),
    });
  }

  constructor(private fb: FormBuilder) {
    this.studentForm = fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      studentClass: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }
}

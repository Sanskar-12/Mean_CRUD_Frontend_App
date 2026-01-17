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
  students: Student[] = [];

  // form onsubmit function
  onSubmit() {
    console.log(this.studentForm.value);
  }

  // this will run when the component will initialise
  ngOnInit(): void {
    this.apiService
      .getStudents()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        }),
      )
      .subscribe((res) => {
        this.students = res.data;
        console.log(this.students);
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

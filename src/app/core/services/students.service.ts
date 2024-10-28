import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, delay, map, Observable, of } from 'rxjs';
import { Student } from 'src/app/features/dashboard/students/models';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  private baseUrl = environment.apiBaseUrl

  constructor(private httpClient: HttpClient) { }


  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseUrl}/students`)
  }

  removeStudentById(id: number): Observable<Student[]> {
    return this.httpClient.delete<Student>(`${this.baseUrl}/students/${id}`)
    .pipe(concatMap(() => this.getStudents()))
  }


  updateStudentById(id: number, update: Partial<Student>): Observable<Student[]> {
    return this.httpClient.patch(`${this.baseUrl}/students/${id}`, update)
    .pipe(concatMap(()=> this.getStudents()))
  }

  addStudent(newStudent: Omit<Student, 'id'>): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseUrl}/students`, {...newStudent, createdAt: new Date().toISOString()})
  }


  getStudentsBy(id:number): Observable<Student|undefined>{
    return this.httpClient.get<Student>(`${this.baseUrl}/students/${id}`)
  }
}

import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Student } from 'src/app/features/dashboard/students/models';

let DATABASE: Student[] = [
  {
    id: 1442,
    firstName: 'juan',
    lastName: 'perez',
    mail: 'juan.perez@gmail.com',
    createdAt: new Date(),
  },
  {
    id: 2343,
    firstName: 'pedro',
    lastName: 'gomez',
    mail: 'gomezzzpedro@hotmail.com',
    createdAt: new Date(),
  },
  {
    id: 3422,
    firstName: 'juan',
    lastName: 'luis',
    mail: 'luisluisjuanjuan@msn.com.ar',
    createdAt: new Date(),
  },
];

@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  constructor() { }

  private simulateRequest(data: Student[]): Observable<Student[]> {
    return of(data).pipe(delay(1000));
  }

  getStudents(): Observable<Student[]> {
    return this.simulateRequest(DATABASE);
  }

  removeStudentById(id: number): Observable<Student[]> {
    DATABASE = DATABASE.filter(student => student.id !== id);
    return this.simulateRequest(DATABASE);
  }


  updateStudentById(id: number, update: Partial<Student>): Observable<Student[]> {
    DATABASE = DATABASE.map(student => student.id === id ? { ...student, ...update } : student);
    return this.simulateRequest(DATABASE);
  }

  addStudent(newStudent: Student): Observable<Student[]> {
    DATABASE = [...DATABASE, newStudent];
    return this.simulateRequest(DATABASE);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, delay, map, Observable, of } from 'rxjs';
import { Courses } from 'src/app/features/dashboard/courses/models';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = environment.apiBaseUrl

  constructor(private httpClient:HttpClient){}

  private simulateRequest(data: Courses[]): Observable<Courses[]> {
    return of(data).pipe(delay(1000));
  }

  getCourses(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(`${this.baseUrl}/courses`)
  }

  removeCoursesById(id: number): Observable<Courses[]> {
    return this.httpClient.delete<Courses>(`${this.baseUrl}/courses/${id}`)
    .pipe(concatMap(()=>this.getCourses()))
  }

  updateCoursesById(
    id: number,
    update: Partial<Courses>
  ): Observable<Courses[]> {
    return this.httpClient.patch(`${this.baseUrl}/courses/${id}`, update)
    .pipe(concatMap(()=> this.getCourses()))
  }

  addCourses(newCourses: Omit<Courses, 'id'>): Observable<Courses> {
    return this.httpClient.post<Courses>(`${this.baseUrl}/courses`, {...newCourses})
  }

  getCourseById(id: number): Observable<Courses | undefined> {
    return this.httpClient.get<Courses>(`${this.baseUrl}/courses/${id}`)
  }
}

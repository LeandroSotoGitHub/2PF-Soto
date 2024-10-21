import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Courses } from 'src/app/features/dashboard/courses/models';
import { generateUniqueId } from 'src/app/shared/utils';

  let COURSES_DB: Courses[] = [
    {
      id: generateUniqueId(),
      name: 'AngularJs',
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: generateUniqueId(),
      name: 'Desarrollo Web',
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: generateUniqueId(),
      name: 'Figma',
      startDate: new Date(),
      endDate: new Date()
    },
  ]


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private simulateRequest(data: Courses[]): Observable<Courses[]> {
    return of(data).pipe(delay(1000));
  }

  getCourses(): Observable<Courses[]> {
    return this.simulateRequest(COURSES_DB);
  }

  removeCoursesById(id: number): Observable<Courses[]> {
    COURSES_DB = COURSES_DB.filter(Courses => Courses.id !== id);
    return this.simulateRequest(COURSES_DB);
  }


  updateCoursesById(id: number, update: Partial<Courses>): Observable<Courses[]> {
    COURSES_DB = COURSES_DB.map(Courses => Courses.id === id ? { ...Courses, ...update } : Courses);
    return this.simulateRequest(COURSES_DB);
  }

  addCourses(newCourses: Courses): Observable<Courses[]> {
    COURSES_DB = [...COURSES_DB, newCourses];
    return this.simulateRequest(COURSES_DB);
  }

  getCourseById(id:number): Observable<Courses|undefined>{
    return this.getCourses().pipe(map((student) => student.find((s)=> s.id === id)))
  }

}

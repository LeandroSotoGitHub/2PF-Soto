import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from 'src/app/features/dashboard/enrollments/models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(
    private HttpClient: HttpClient
  ) { }

  getEnrollments():Observable<Enrollment[]>{
    return this.HttpClient.get<Enrollment[]>(`${environment.apiBaseUrl}/enrollments?_embed=student&_embed=course`)
  }
}

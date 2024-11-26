import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/core/services/students.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent implements OnInit{
  studentId?:string
  student?: Student 
  isLoading: boolean = true


  constructor(
    private studentsService: StudentsService,
    private activatedRoute:ActivatedRoute
  ){ }
  
  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.params['id']

    console.log(this.studentId)
    if (this.studentId) {
      this.studentsService.getStudentsBy(this.studentId).subscribe({
        next: (s) => {
          console.log(s)
          this.isLoading = false
          this.student = s;
        },
        error: (err) => {
          this.isLoading = false
          console.error(err)
        }
      });
    }
  }
}

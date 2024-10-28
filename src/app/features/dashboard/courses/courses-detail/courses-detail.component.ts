import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../models';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.css']
})
export class CoursesDetailComponent implements OnInit {
  courseId?:number
  course?: Courses 
  isLoading: boolean = true


  constructor(
    private courseService: CourseService,
    private activatedRoute:ActivatedRoute
  ){ }
  
  ngOnInit(): void {
    this.courseId = Number(this.activatedRoute.snapshot.params['id'])

    if (this.courseId) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (c) => {
          this.isLoading = false
          this.course = c;
        },
        error: (err) => {
          this.isLoading = false
          console.error(err)
        }
      });
    }
  }
}
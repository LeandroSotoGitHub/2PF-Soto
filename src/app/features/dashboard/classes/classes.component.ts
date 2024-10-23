import { Component, OnInit, signal } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';
import { Courses } from '../courses/models';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit{
  courses: Courses[] = []
  selectedCourse!: Courses
  isLoading: boolean = true
  readonly panelOpenState = signal(false);

  constructor(private courseService: CourseService){}

  ngOnInit(): void {
    this.getCourses()
  }

  getCourses(){
    this.courseService.getCourses().subscribe({
      next: (c) =>{
        this.isLoading = false
        this.courses = c
        this.selectedCourse = this.courses[0]
      } 
    })
  }
}

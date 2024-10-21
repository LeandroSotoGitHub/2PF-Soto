import { Component, OnInit, Pipe } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { Courses } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CoursesModalComponent } from './courses-modal/courses-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Courses[] = []
  isLoading: boolean = true
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];



  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loadCourses()
  }

  loadCourses(){
    this.courseService.getCourses().subscribe({
      next: (c) =>{
        this.isLoading = false
        this.courses = c
      }
    })
  }

  openModal(editingCourse?: Courses) {
    this.matDialog
      .open(CoursesModalComponent, {
        data: {
          editingCourse,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingCourse) {
              this.handleUpdate(editingCourse.id, result);
            } else {
              this.handleAdd(result);
            }
          }
        },
      });
  }


  handleUpdate(id: number, update: Courses) {
    this.isLoading = true;
    this.courseService.updateCoursesById(id, update).subscribe({
      next: (c) => {
        this.courses = c;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  handleAdd(newStudent: Courses): void {
    this.isLoading = true;
    this.courseService.addCourses(newStudent).subscribe({
      next: (c) => {
        this.courses = c;
      },
      complete: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id: number) {
    this.isLoading = true;
    if (confirm('Esta seguro?')) {
      this.courseService.removeCoursesById(id).subscribe({
        next: (c) => {
          this.courses = c;
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  goToDetail(id: number) {
    this.router.navigate([id,'detail'], { relativeTo: this.activatedRoute })
  }
}

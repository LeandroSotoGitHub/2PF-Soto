import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './students-dialog/students-dialog.component';
import { Student } from './models';
import { StudentsService } from '../../../core/services/students.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private StudentsService: StudentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'mail', 'date', 'actions'];
  dataSource: Student[] = [];

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.StudentsService.getStudents().subscribe({
      next: (students) => {
        this.dataSource = students;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openModal(editingStudent?: Student) {
    this.matDialog
      .open(StudentsDialogComponent, {
        data: {
          editingStudent,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          console.log(result);
          if (!!result) {
            if (editingStudent) {
              this.handleUpdate(editingStudent.id, result);
            } else {
              this.StudentsService
              .addStudent(result)
              .subscribe({
                next: () => this.loadStudents()
              })
            }
          }
        },
      });
  }

  handleUpdate(id: number, update: Student) {
    this.isLoading = true;
    this.StudentsService.updateStudentById(id, update).subscribe({
      next: (students) => {
        this.dataSource = students;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }


  onDelete(id: number) {
    this.isLoading = true;
    if (confirm('¿Está seguro?')) {
      this.StudentsService.removeStudentById(id).subscribe({
        next: (students) => {
          this.dataSource = students;
        },
        error: (e) => {
          console.log(e)
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

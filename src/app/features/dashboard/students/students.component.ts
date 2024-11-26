import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './students-dialog/students-dialog.component';
import { Student } from './models';
import { StudentsService } from '../../../core/services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
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
          if (!!result) {
            if (editingStudent) {
              this.handleUpdate(editingStudent.id, result) 
            } else {
              this.StudentsService.addStudent(result).subscribe({
                next: () => {
                  this.loadStudents();
                  this._snackBar.open('Estudiante creado con éxito', 'Cerrar', {
                    duration: 3000,
                  });
                },
                error: () => {
                  this._snackBar.open(
                    'Error al crear el estudiante. Inténtelo nuevamente.',
                    'Cerrar',
                    {
                      duration: 3000,
                      panelClass: ['error-snackbar'],
                    }
                  );
                },
              });
            }
          }
        },
      });
  }

  handleUpdate(id: string, update: Student) {
    this.isLoading = true;
    this.StudentsService.updateStudentById(id, update).subscribe({
      next: (students) => {
        this.dataSource = students
        this._snackBar.open('Estudiante editado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      },
      error: () => {
        this._snackBar.open(
          'Error al editar el estudiante. Inténtelo nuevamente.',
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        )
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }


  onDelete(id: string) {
    this.isLoading = true;
    if (confirm('¿Está seguro?')) {
      this.StudentsService.removeStudentById(id).subscribe({
        next: (students) => {
          this.dataSource = students
          this._snackBar.open('Estudiante eliminado con éxito', 'Cerrar', {
            duration: 3000,
          })
        },
        error: (e) => {
          console.log(e)
          this._snackBar.open(
            'Error al eliminar el estudiante. Inténtelo nuevamente.',
            'Cerrar',
            {
              duration: 3000,
              panelClass: ['error-snackbar']
            }
          )
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  goToDetail(id: string) {
    this.router.navigate([id,'detail'], { relativeTo: this.activatedRoute })
  }
}

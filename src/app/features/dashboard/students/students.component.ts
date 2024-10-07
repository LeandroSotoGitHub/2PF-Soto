import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './students-dialog/students-dialog.component';
import { Student } from './models';

const studentsList: Student[] = [
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

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  constructor(private matDialog: MatDialog) {}

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
          console.log(result)
          if (!!result) {
            if (editingStudent) {
              this.studentsList = this.studentsList.map((student) => student.id === editingStudent.id ? {...student, ...result} : student)
            } else {
              this.studentsList = [...studentsList, ...result]
            }
          }
        },
      });
  }

  onDelete(id: number) {
    if (confirm('Esta seguro?')) {
      this.studentsList = this.studentsList.filter(
        (student) => student.id !== id
      )
    }
  }

  displayedColumns: string[] = ['id', 'name', 'mail', 'date', 'actions']
  studentsList = studentsList
}

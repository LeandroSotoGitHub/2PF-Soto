import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './students-dialog/students-dialog.component';
import { Student } from './models';


const studentsList: Student[] = [
  {id: 1, firstName: 'juan', lastName: 'perez', mail: 'H', createdAt: new Date()},
  {id: 2, firstName: 'pedro', lastName: 'gomez', mail: 'He', createdAt: new Date()},
  {id: 3, firstName: 'juan', lastName: 'luis', mail: 'Li', createdAt: new Date()},
];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  constructor(private matDialog: MatDialog){}

  alumno = {
    nombre: 'leandro',
    apellido: 'soto'
  }

  openModal(){
    this.matDialog.open(StudentsDialogComponent).afterClosed().subscribe({
      next: (result) =>{
        console.log(result)
        if(!!result){
          this.studentsList = [...studentsList]
        }
      }
    })
  }

  displayedColumns: string[] = ['id', 'name', 'mail', 'date','actions'];
  studentsList = studentsList;
}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../models';
import { FormValidatorHelper } from 'src/app/shared/utils/form-validator.helper';
import { generateToken } from '../../../../shared/utils/index';

interface StudentDialogData {
  editingStudent?: Student
}


@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.css']
})
export class StudentsDialogComponent {
  studentsForm: FormGroup
  existingIds: number[] = []

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: StudentDialogData
  ){ 
    this.studentsForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20), Validators.pattern(/^[^\d]*$/) ]],
      lastName: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(20), Validators.pattern(/^[^\d]*$/) ]],
      mail: ['', [Validators.required, Validators.email]]
    })
    this.patchFormValue()
  }

  getErrorMessage(controlName: string): string{
    return FormValidatorHelper.getErrorMessage(this.studentsForm, controlName)
  }

  hasError(controlName: string): boolean {
    return FormValidatorHelper.hasError(this.studentsForm, controlName)
  }

  onSave(): void {
    if (this.studentsForm.invalid) {
      this.studentsForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.studentsForm.value,
        id: this.isEditing
          ? this.data!.editingStudent!.id
          : generateToken(4),
        createdAt: this.isEditing
          ? this.data!.editingStudent!.createdAt
          : new Date(),
      });
    }
  }

  patchFormValue(){
    if(this.data?.editingStudent){
      this.studentsForm.patchValue(this.data.editingStudent)
    }
  }


  generateUniqueId(): number {
    let newId = Math.floor(Math.random() * 9000) + 1000
    
    // Sigue generando un nuevo ID mientras ya exista en el array
    while (this.existingIds.includes(newId)) {
      newId = Math.floor(Math.random() * 9000) + 1000
    }
    
    // Almacena el ID una vez que es único
    this.existingIds.push(newId)
    return newId
  }

  private get isEditing(){
    return !!this.data?.editingStudent
  }
}

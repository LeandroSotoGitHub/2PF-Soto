import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { StudentsDialogComponent } from '../../students/students-dialog/students-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Courses } from '../models';

interface CoursesModalData {
  editingCourse?: Courses
}



@Component({
  selector: 'app-courses-modal',
  templateUrl: './courses-modal.component.html',
  styleUrls: ['./courses-modal.component.css']
})
export class CoursesModalComponent {
  courseForm: FormGroup
  existingIds: number[] = []

  constructor(
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private MatDialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: CoursesModalData
  ){ 
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20), Validators.pattern(/^[^\d]*$/) ]],
      startDate: ['',[Validators.required ]],
      endDate: ['', [Validators.required]]
    })
    this.patchFormValue()
  }

  getErrorMessage(controlName: string): string{
    return this.formValidatorService.getErrorMessage(this.courseForm, controlName)
  }

  hasError(controlName: string): boolean {
    return this.formValidatorService.hasError(this.courseForm, controlName);
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.MatDialogRef.close({
        ...this.courseForm.value,
        id: this.isEditing
          ? this.data!.editingCourse!.id
          : this.generateUniqueId()
      });
    }
  }

  patchFormValue(){
    if(this.data?.editingCourse){
      this.courseForm.patchValue(this.data.editingCourse)
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
    return !!this.data?.editingCourse
  }
}

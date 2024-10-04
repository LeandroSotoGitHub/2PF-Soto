import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from '../../../../core/services/form-validator.service';
import { noNumbersValidator } from 'src/app/core/validators/validators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.css']
})
export class StudentsDialogComponent {
  studentsForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private matDialogRef: MatDialogRef<StudentsDialogComponent>
  ){ 
    this.studentsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20), noNumbersValidator()]],
      surname: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(20), noNumbersValidator()]],
      mail: ['', [Validators.required, Validators.email]]
    })
  }

  getErrorMessage(controlName: string): string{
    return this.formValidatorService.getErrorMessage(this.studentsForm, controlName)
  }

  hasError(controlName: string): boolean {
    return this.formValidatorService.hasError(this.studentsForm, controlName);
  }

  onSave():void {
    this.matDialogRef.close({ resultado: 'ok'})
  }
}

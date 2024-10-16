import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  private errorMessages: any = {
    required: 'Este campo es requerido',
    email: 'El formato del correo es incorrecto',
    minlength: 'Ingresa mas caracteres',
    maxlength: 'Se supero el maximo de caracteres',
    pattern: 'No ingresar números'
  }

  getErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName)
    
    if (control && control.errors) {
      for (const error in control.errors) {
          return this.errorMessages[error]
      }
    }
    return ''
  }

  hasError(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);

    const isControlInvalid = control?.invalid ?? false
    const isControlTouchedOrDirty = control?.dirty || control?.touched || false
  
    return isControlInvalid && isControlTouchedOrDirty
  }
}

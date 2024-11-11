import { FormGroup } from '@angular/forms';

export class FormValidatorHelper {

  private static errorMessages: any = {
    required: 'Este campo es requerido',
    email: 'El formato del correo es incorrecto',
    minlength: 'Ingresa más caracteres',
    maxlength: 'Se superó el máximo de caracteres',
    pattern: 'No ingresar números'
  };

  static getErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);

    if (control && control.errors) {
      for (const error in control.errors) {
        return this.errorMessages[error];
      }
    }
    return '';
  }

  static hasError(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);

    const isControlInvalid = control?.invalid ?? false
    const isControlTouchedOrDirty = control?.dirty || control?.touched || false
  
    return isControlInvalid && isControlTouchedOrDirty
  }
}
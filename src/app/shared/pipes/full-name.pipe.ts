import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/features/dashboard/students/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  
  transform(value: Student): string {
    return this.capitalize(value.firstName) + ' ' + this.capitalize(value.lastName);
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'textUpperCase'
})
export class TextPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.toUpperCase();
  }
}

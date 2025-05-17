import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'monetext'
})
export class MonetextPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;{}
    return value + " Zimbabwe dollor";
  }
}

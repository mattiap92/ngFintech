import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe'
})
export class TruncatePipe implements PipeTransform {

  transform(text: string | undefined): string {
    let textTruncated = text?.slice(0, 15) + '...';
    return textTruncated;
  }

}

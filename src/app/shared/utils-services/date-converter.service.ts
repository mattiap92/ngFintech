import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {

  constructor() { }

  convertStringToNativeDate(dateToTransform: string): Date{
    return new Date(dateToTransform);
  }
  
  convertNativeDateToString(dateToTransform: Date): string{
    let month = (dateToTransform.getMonth() + 1);
    let day =  dateToTransform.getDate();
    let year = dateToTransform.getFullYear();
    
    return [month, day, year].join('/');
  }

}

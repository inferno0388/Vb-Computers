import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const SHARE_DATA_TOKEN = new InjectionToken<any>('ShareData');

@Injectable({
  providedIn: 'root'
})
export class ShareDataServiceService {


  constructor() { }

  private data: any;

  setData(data: any) {
    this.data = data;
  }
  getData() {
    return this.data;
  }

  exceptionCompany= `honda arc`
}

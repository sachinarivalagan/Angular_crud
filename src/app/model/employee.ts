import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeModel {
  
  empId: number;
  empName: string;
  empEmail: string;
  empPhone: number; 
  empCity: string;
  empState: string;
  empCountry: string
  empPincode: number;
  address: string;

  constructor() { 
    this.empId = 1;
    this.empName = '';
    this.empEmail = '';
    this.empPhone = 0;
    this.empCity = '';
    this.empState = '';
    this.empCountry = '';
    this.empPincode = 0;
    this.address = '';
  }
}

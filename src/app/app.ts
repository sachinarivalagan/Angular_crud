import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/employee';
import { CommonModule } from '@angular/common';
import id from '@angular/common/locales/extra/id';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-curd');

  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  isEditMode: boolean = false;
  
  constructor() {
   
   this.createEmployee();
   this.loadEmployees();
  
  
   }
   loadEmployees() {
    const oldData = localStorage.getItem('employeeData');
    if (oldData != null) {
      this.employeeList = JSON.parse(oldData);
    }
  }
   createEmployee() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      empName: new FormControl(this.employeeObj.empName),
      empEmail: new FormControl(this.employeeObj.empEmail),
      empPhone: new FormControl(this.employeeObj.empPhone),
      empCity: new FormControl(this.employeeObj.empCity),
      empState: new FormControl(this.employeeObj.empState),
      empCountry: new FormControl(this.employeeObj.empCountry),
      empPincode: new FormControl(this.employeeObj.empPincode),
      address: new FormControl(this.employeeObj.address)  
   });
  }
  onSubmit() {
    if (this.isEditMode) {
      this.onUpdate();
    } else {
      this.onSave();
    }
  }
  onSave() {
    // Generate new ID
    const newId = this.employeeList.length > 0 
      ? Math.max(...this.employeeList.map(e => e.empId)) + 1 
      : 1;
    
    this.employeeForm.controls['empId'].setValue(newId);
    this.employeeList.unshift(this.employeeForm.value);
    localStorage.setItem('employeeData', JSON.stringify(this.employeeList));
    this.employeeForm.reset();
    this.showSuccessMessage('Employee added successfully!');
  }
  onEdit(employee: EmployeeModel) {  
     this.isEditMode = true;
    this.employeeObj = { ...employee }; // Create a copy
    this.createEmployee();
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  onUpdate() {
   const index = this.employeeList.findIndex(
      emp => emp.empId === this.employeeForm.controls['empId'].value
    );
    
    if (index !== -1) {
      this.employeeList[index] = this.employeeForm.value;
      localStorage.setItem('employeeData', JSON.stringify(this.employeeList));
      this.showSuccessMessage('Employee updated successfully!');
      this.onReset();
    }
      
    
  }
  onDelete(empId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      const index = this.employeeList.findIndex(emp => emp.empId == empId);
      this.employeeList.splice(index, 1);
      localStorage.setItem('employeeData', JSON.stringify(this.employeeList));
      this.showSuccessMessage('Employee deleted successfully!');
    }
    
  }
  onReset() {
     this.employeeForm.reset();
    this.employeeObj = new EmployeeModel();
    this.isEditMode = false;
    this.createEmployee();
  }
   showSuccessMessage(message: string) {
    // You can implement a toast notification here
    alert(message);
  }
}

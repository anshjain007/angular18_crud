import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular18_crud';
  employeeForm!: FormGroup;
  employeeObj: EmployeeModel = new EmployeeModel();
  EmployeeList: EmployeeModel[] = [];
  console: any;
  id: number = 0;
  constructor() {
    debugger;
    this.createForm()
    const olddata = localStorage.getItem("EmpData")
    if (olddata != null) {
      const parseData = JSON.parse(olddata)
      this.EmployeeList = parseData;

    }

  }

  createForm() {
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empid), // Optional field for edit functionality
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      email: new FormControl(this.employeeObj.email),
      number: new FormControl(this.employeeObj.number),
      pincode: new FormControl(this.employeeObj.pincode),
      address: new FormControl(this.employeeObj.address)
    })
  }

  submit() {
    debugger;
    const olddata = localStorage.getItem("EmpData")
    if (olddata != null) {
      const parseData = JSON.parse(olddata)
      this.employeeForm.controls['empid'].setValue(parseData.length + 1);
      this.EmployeeList.unshift(this.employeeForm.value);
    } else {
      this.EmployeeList.unshift(this.employeeForm.value);

    }
    localStorage.setItem('EmpData', JSON.stringify(this.EmployeeList))

    this.console.log(this.employeeForm.controls['empid'].value)
  }



  edit(item: EmployeeModel) {
    // console.log(item);
    this.employeeObj = item;
    this.createForm();
    this.id = item.empid;
    console.log(this.id);
  }

  update() {
    const record = this.EmployeeList.find(m => m.empid == this.employeeForm.controls['empid'].value)
    console.log();
    // debugger;
    if (record != undefined) {
      record.empid = 1
    }
  }

  delete(id: number) {
    const deleteIT = confirm('Are you suer');
    if (deleteIT) {
      const index = this.EmployeeList.findIndex(m => m.empid == id);
      this.EmployeeList.splice(index, 1)
    }
    localStorage.setItem('EmpData', JSON.stringify(this.EmployeeList))
  }
}

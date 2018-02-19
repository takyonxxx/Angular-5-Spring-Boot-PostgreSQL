import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeService } from './app.employee.service';
import { IEmployee } from './app.employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  employees: IEmployee[];
  employee = new IEmployee();
  errorMessage: String;
  dtOptions: DataTables.Settings = {};

  displayTable = false;
  count = 0;

  cities = [
    { id: 1, name: 'Bilecik' },
    { id: 2, name: 'Ankara' },
    { id: 3, name: 'Eskisehir' }
  ];
  selectedValue = null;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 50
    };
    this.displayTable = true;
    this.doGET();
  }

  editSelected(id: number): void {
    Array.from(this.employees).forEach((eachObj) => {
      if (eachObj.id === id) {
        this.employee = this.employees[this.count];
        // (<HTMLInputElement>document.getElementById('id')).value = eachObj.id.toString();
      }
      this.count++;
    });
    this.count = 0;
  }

  deleteSelected(id: number): void {
    this.doDELETE(id);
  }

  doGETbyID(id: number): void {
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employees = employee,
        error => this.errorMessage = <any>error);
  }

  doGET(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees,
        error => this.errorMessage = <any>error);
  }

  doADD(): void {
    this.employee.id = null;
    this.employeeService.addEmployee(this.employee)
      .subscribe(employee => {
        this.doGET();
        this.reset();
      },
        error => this.errorMessage = <any>error);
  }

  doUPDATE(id: number): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(employee => {
        this.doGET();
        this.reset();
      },
        error => this.errorMessage = <any>error);
  }

  doDELETE(id: number): void {
    this.employeeService.deleteEmployee(id)
      .subscribe(employee => {
        this.doGET();
        this.reset();
      },
        error => this.errorMessage = <any>error);
  }

  private reset() {
    this.employee.id = null;
    this.employee.name = null;
    this.employee.email = null;
    this.employee.city = null;
    this.employee.date = null;
    this.employee.active = null;
    this.errorMessage = null;
  }
}

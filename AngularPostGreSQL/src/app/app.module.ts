import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { EmployeeService } from './app.employee.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    DataTablesModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

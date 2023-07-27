import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { GenerateBillComponent } from './generate-bill/generate-bill.component';
import { HistoryComponent } from './history/history.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ServicesComponent } from './services/services.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import{HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { PopupFormComponent } from './popup-form/popup-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { DatePipe } from '@angular/common';
import { BillSecondComponent } from './bill-second/bill-second.component';
import { GenericBillComponent } from './generic-bill/generic-bill.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    GenerateBillComponent,
    HistoryComponent,
    CreateUserComponent,
    ServicesComponent,
    PopupFormComponent,
    ErrorDialogComponent,
    AddCompanyComponent,
    BillSecondComponent,
    GenericBillComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatDialogModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  // providers: []
})
export class AppModule { }

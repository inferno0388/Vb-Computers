import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { GenerateBillComponent } from './generate-bill/generate-bill.component';
import { HistoryComponent } from './history/history.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AddCompanyComponent } from './add-company/add-company.component';

const routes: Routes = [
{ path: 'dashboard', component: DashboardComponent },  
{ path: '', component:  LoginComponent}, 
{ path: 'generate-bill', component: GenerateBillComponent },  
{ path: 'history', component:  HistoryComponent}, 
{ path: 'create-user', component:  CreateUserComponent}, 
{ path: 'add-company', component:  AddCompanyComponent}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

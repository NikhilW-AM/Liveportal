import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ReportComponent } from './report/report.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard]},
  {path:'question',component:QuestionComponent,canActivate: [AuthGuard]},
  {path:'test',component:TestComponent,canActivate: [AuthGuard]},
  {path:'report',component:ReportComponent,canActivate: [AuthGuard]},
  {path:'edit/:eid',component:EditComponent,canActivate: [AuthGuard]},
  {path:'addquestion',component:AddquestionComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

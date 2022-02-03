import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ReportComponent } from './report/report.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'question',component:QuestionComponent},
  {path:'test',component:TestComponent},
  {path:'report',component:ReportComponent},
  {path:'edit/:eid',component:EditComponent},
  {path:'addquestion',component:AddquestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

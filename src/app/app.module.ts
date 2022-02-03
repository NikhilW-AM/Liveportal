import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SeeComponent } from './see/see.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { ReportComponent } from './report/report.component';
import { HeaderComponent } from './header/header.component';
import { EditComponent } from './edit/edit.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    SeeComponent,
    DashboardComponent,
    TestComponent,
    ReportComponent,
    HeaderComponent,
    EditComponent,
    AddquestionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule, BrowserAnimationsModule,FormsModule,
    Ng2SearchPipeModule,ReactiveFormsModule,ToastrModule.forRoot(),RecaptchaV3Module,
    MatFormFieldModule,MatIconModule,MatInputModule
  ],
  providers: [{
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: environment.recaptcha.siteKey,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }

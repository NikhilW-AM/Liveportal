import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http:HttpClient, private route:Router) { }
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRkMjgxZWU2ZDdkNzdjOGU0ZjY4ZmYiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQ0MzA1ODQ3LCJleHAiOjE2NDQzNDkwNDd9.SQIqfS9BlnXa1u365opBI0kbrrhZ4BYOsaEw-Az3qwc'
  private _url = 'https://admin.liveexamcenter.in/api/questions?page=1&limit=&term=&topic='
  private _topicUrl = "https://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term="
  private subjectUrl = "https://admin.liveexamcenter.in/api/subjects?page=1&limit=5&term="

  private postUrl = 'https://admin.liveexamcenter.in/api/questions'
  private editQuestionUrl = 'https://admin.liveexamcenter.in/api/questions'
  qCount:number=0
  qID:any
  getData()
  {
    return this.http.get(this._url,{
      headers:{
        Authorization : this.token
      }
    })
  }

  getTopicData(){

    return this.http.get(this._topicUrl,{
      headers:{
        Authorization : this.token
      }
    })
  }
  
  getTopics(questionCount:number,id:any){
    console.log("fetch",id);
    this.qCount = questionCount
    this.qID = id
    let url = `https://admin.liveexamcenter.in/api/questions?page=1&limit=${questionCount}&term=&topic=${id}`
    console.log(url);
    
    return this.http.get(url)
  }

  searchQuestion(search:any){
    let searchUrl = `https://admin.liveexamcenter.in/api/questions?page=1&limit=${this.qCount}&term=${search}&topic=${this.qID}`

    return this.http.get(searchUrl)    
  }

  getSubject(){
    return this.http.get(this.subjectUrl)
  }

  geteditQuestionData(id:any)
  {
    let url = `https://admin.liveexamcenter.in/api/questions/${id}`
    return this.http.get(url)
  }
  
  postData(data:any)
  {
    console.log(data);
    
    return this.http.post(this.postUrl,data)
  }
  
  login(username:string,password:string,recaptcha:any){
    return this.http.post<any>(`http://admin.liveexamcenter.in/api/auth/login`,{email: username, password: password,reCaptchaToken:recaptcha}
    ).pipe(map((user:any)=>{
      if(user && user.token)
      {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    })
    )
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    return currentUser.token;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.route.navigate(['/login'])
  }

}

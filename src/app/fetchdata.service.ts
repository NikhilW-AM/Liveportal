import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http:HttpClient, private route:Router) { }
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjAyNDkyNTlhZmUyOTU0NzZjNDJhOGEiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQ0NDExNDIxLCJleHAiOjE2NDQ0NTQ2MjF9.63JDOwIOFPfh4ILdRYUrzS2I6FqrZ_Co51mrHjZBUFI'
  private _url = 'https://admin.liveexamcenter.in/api/questions?page=1&limit=&term=&topic='
  private _topicUrl = "https://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term="
  private subjectUrl = "http://admin.liveexamcenter.in/api/subjects?page=1&limit=5&term="

  private postUrl = 'https://admin.liveexamcenter.in/api/questions'
  private editQuestionUrl = 'https://admin.liveexamcenter.in/api/questions'

  private apiurl = 'http://localhost:4200'
  private google='http://admin.liveexamcenter.in/api/auth/google'
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

  getTopicData(id:any){

    return this.http.get(`http://admin.liveexamcenter.in/api/topics/subject/${id}`)
  }
  getAllTopicData()
  {
    return this.http.get(this._topicUrl,{
      headers:{
        Authorization : this.token
      }
    })
  }
  
  getTopics(questionCount:number,id:any){
    //console.log("fetch",id);
    this.qCount = questionCount
    this.qID = id
    let url = `https://admin.liveexamcenter.in/api/questions?page=1&limit=${questionCount}&term=&topic=${id}`
   // console.log(url);
    
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
  
  postdata(data:any)
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

  loginGoogle(token:any,recaptcha:any)
  {
    return this.http.post<any>(`http://admin.liveexamcenter.in/api/auth/google`,{idToken: token, reCaptchaToken: recaptcha}
    ).pipe(map((user:any)=>{
      if(user && user.token)
      {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    })
    )
  }

}

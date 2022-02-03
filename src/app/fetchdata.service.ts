import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http:HttpClient) { }
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRkMjdjNGU2ZDdkNzdjOGU0ZjY4ZGQiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQzODYxNTA3LCJleHAiOjE2NDM5MDQ3MDd9.rPgYdEbz9URWadcn_KhZ9Pmp8feSNLFryPmqZGpdM50'
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
    
    return this.http.get(url,{
      headers:{
        Authorization : this.token
      }
    })
  }

  searchQuestion(search:any){
    let searchUrl = `https://admin.liveexamcenter.in/api/questions?page=1&limit=${this.qCount}&term=${search}&topic=${this.qID}`

    return this.http.get(searchUrl,{
      headers : {
        Authorization : this.token
      }
    })    
  }

  getSubject(){
    return this.http.get(this.subjectUrl,{
      headers:{
        authorization:this.token
      }
    })
  }

  geteditQuestionData(id:any)
  {
    let url = `https://admin.liveexamcenter.in/api/questions/${id}`
    return this.http.get(url,{
      headers:{
        authorization:this.token
      }
    })
  }
  
  postData(data:any)
  {
    console.log(data);
    
    return this.http.post(this.postUrl,data,{
      headers:{
        authorization:this.token
      }
    })
  }
}

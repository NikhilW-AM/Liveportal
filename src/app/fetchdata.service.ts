import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http:HttpClient) { }
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRkMjgxZWU2ZDdkNzdjOGU0ZjY4ZmYiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQyNDc5MzU5LCJleHAiOjE2NDI1MjI1NTl9.xUFvw4dE-6hzMMY8LecetP99VS-4TPzTUgtNvkfR8gI'
  private _url = 'https://admin.liveexamcenter.in/api/questions?page=1&limit=&term=&topic='
  private _topicUrl = "https://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term="

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
}

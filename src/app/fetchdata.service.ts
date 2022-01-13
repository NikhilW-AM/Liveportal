import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http:HttpClient) { }
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRkMjgxZWU2ZDdkNzdjOGU0ZjY4ZmYiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQyMDYyMzQ0LCJleHAiOjE2NDIxMDU1NDR9.P-74Q2gCM_kH3uaoh3qxWbOkAOSil6Q0zpnpeRHfULc'
  private _url = 'https://admin.liveexamcenter.in/api/questions?page=1&limit=&term=&topic='
  private _topicUrl = "https://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term="

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
    let url = `https://admin.liveexamcenter.in/api/questions?page=1&limit=${questionCount}&term=&topic=${id}`
    console.log(url);
    
    return this.http.get(url,{
      headers:{
        Authorization : this.token
      }
    })
  }
}

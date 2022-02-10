import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private queUrl = "http://admin.liveexamcenter.in/api/questions/62040aea9afe295476c431da"
  constructor(private http:HttpClient) { }


  getEditQuestionData(id:string)
  {
    return this.http.get(`http://admin.liveexamcenter.in/api/questions/${id}`)
  }
  
}

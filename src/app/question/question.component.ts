import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionCountArray:number[]=[5,10,20,30,50]
  constructor(private fetch:FetchdataService, private rout:Router, private activate:ActivatedRoute) { }
  details?:any
  topicData:any
  topic:any[]=[]
  topicName:string=''
  questionsArray:any[]=[]
  questionCount:number = 0
  questionObject:any
  topicId:any
  name:any[] = []
  questionTopic:any[]=[]
  searchBox:any
  ngOnInit(): void {
    this.fetch.getData().subscribe(data => {this.details = data,
      this.questionsArray = this.details.result
    //console.log(this.questionsArray);
    })
    this.fetch.getTopicData().subscribe(topic => {this.topicData = topic,
    this.topic = this.topicData.result;
    //console.log(this.topic);
    
  })
  }

  select(Count:any)
  {
    console.log(Count.target.value);
    this.questionCount = Count.target.value
    this.changeTopic(this.questionCount,this.topicId)
  }

  selectTopic(event:any)
  {
    this.topicName = event.target.value
    for(let i=0; i<this.topic.length; i++)
    {
      if(this.topic[i].name === this.topicName)
      {
        console.log(this.topicName);
        this.topicId = this.topic[i]._id;
        break;
      }
    }
   // console.log(this.questionCount, this.topicId);
    
    this.changeTopic(this.questionCount,this.topicId)
  }

  changeTopic(questionCount:number,topicId:any)
  {
    this.fetch.getTopics(questionCount,topicId).subscribe(
      data => {this.questionObject = data
        this.questionTopic = this.questionObject.result

        console.log(this.questionObject);
        
      })
  }
  search(){
    console.log(this.searchBox);
    this.fetch.searchQuestion(this.searchBox).subscribe(data => {this.details = data,
      this.questionsArray = this.details.result
      //console.log(this.questionsArray);
      
    })

  }

  edit(id:any)
  {
    this.rout.navigate(['/edit',id])
  }
}

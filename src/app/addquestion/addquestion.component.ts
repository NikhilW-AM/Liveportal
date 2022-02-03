import { Component, OnInit } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import { FormGroup,FormControl,FormArray,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface op{
  option : string,
  isCorrect:boolean
  richTextEditor : string
}
@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {

  subjectobj:any
  subjectArray:any[]=[]
  questionCount:any
  topicObject:any
  topicArray:any[] =[]
  questionType:any[] = ['MULTIPLE CHOICE', 'MULTIPLE RESPONSE', 'FILL IN THE BLANKS']
  difficultyLevel:any[]=['Easy','Medium',"Hard"]
  isValid:boolean = false
  optionType : string = "MULTIPLE CHOICE"
  optionArray:any[]=[
    {option:"",isCorrect: false, richTextEditor:false},
    {option:"",isCorrect: false, richTextEditor:false},
    {option:"",isCorrect: false, richTextEditor:false},
    {option:"",isCorrect: false, richTextEditor:false}]
    

    
    constructor(private fetch : FetchdataService,  private fb:FormBuilder, private toastr: ToastrService, private router:Router) {}
    
    AddForm = this.fb.group({  
      diffLevel:[''],
      options: this.fb.array(this.optionArray.map(contact => this.createContact(contact))) ,  
      questionText:[''],
      rightMarks:[''],
      subject:['    '],
      topic:[''],
      type:[''],
      wrongMarks:['']
    });  
      
    createContact(contact:any):FormGroup{

      return this.fb.group({
       option : [contact.option],
       isCorrect: [contact.isCorrect],
       richTextEditor:[contact.richTextEditor]
     })

     
     
    }
    quantities() : FormArray {  
      return this.AddForm.get("options") as FormArray  
    }  
       
    newQuantity(): FormGroup {  
      return this.fb.group({  
        option: false,  
        textoption: '',  
      })  
    }  
       
    addQuantity() {  
      this.quantities().push(this.newQuantity());  
    }  
       
    removeQuantity(i:number) {  
      this.quantities().removeAt(i);  
    } 
  
  ngOnInit(): void {
    this.subjectData()
    this.topicData()
  }





  subjectData(){
    this.fetch.getSubject().subscribe(data => {this.subjectobj = data,
       this.subjectArray = this.subjectobj.result
      // console.log(this.subjectArray);
    })
  }

  topicData()
  {
    this.fetch.getTopicData().subscribe(topic => {this.topicObject = topic,
    this.topicArray = this.topicObject.result});
  }

  select(Count:any)
  {
    //console.log(Count.target.value);
    this.questionCount = Count.target.value
    
  }

  onSubmit()
  {
    this.toastr.success('Success', 'Question added successfully');
    this.fetch.postData(this.AddForm.value).subscribe(()=>{
    })
    this.router.navigate(['/question'])
  }
  fun(i:number)
  {
    //console.log(i);
    
  }

  isTrue(index:number,value:number){
    this.optionArray[index].option = true
    //console.log(this.optionArray);
    
  }

  changeType(event:any){
    this.optionType = event.target.value 
  }

  changeOption(index:any,type:number)
  {
    if(type)
    {
      
      
      for(let i=0; i<this.optionArray.length; i++)
      {
        //console.log(i,index,i==index);
        this.optionArray[i].option = (i == index)
      }
    }
    
  }
}

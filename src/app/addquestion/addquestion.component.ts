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
  subjectId?:any
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
    
  opobj={option:"",isCorrect: false, richTextEditor:false}
  oparr=[]


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
      
    onChange(i: number) {
      // const formArray: FormArray = this.AddForm.get('options') as FormArray;
  
      // formArray.value.forEach((formGroup: FormGroup, index: number) => {
      //   if (i === index) {
      //     this.optionArray[index].isCorrect = true;
      //   } else {
      //     this.optionArray[index].isCorrect= false;
      //   }
      //   this.optionArray[index].option = this.AddForm.value.options[index].option 
      //   console.log(this.AddForm.value.options[index].option);
      // });
      
      var formArray = this.AddForm.get('options') as FormArray;

      formArray.controls.forEach((data:any,index:number)=>{
        if(i===index)
        {
          formArray.at(index).get('isCorrect')?.setValue(true)
        }
        else
        {
          formArray.at(index).get('isCorrect')?.setValue(false)
        }
      })
      
      console.log(formArray.value);
    }

    
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
        option: '', 
        isCorrect: false, 
        richTextEditor: false  
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
    
  }





  subjectData(){
    this.fetch.getSubject().subscribe(data => {this.subjectobj = data,
       this.subjectArray = this.subjectobj.result
      //console.log(this.subjectArray);
    })
  }

  topicData()
  {
    //this.fetch.getTopicData().subscribe(topic => {this.topicObject = topic,
    //this.topicArray = this.topicObject.result});

    if(this.subjectId)
    {
      this.fetch.getTopicData(this.subjectId).subscribe(topic => {
        this.topicObject = topic,
        this.topicArray = this.topicObject.result
        console.log(this.topicArray);
                
      })
    }
  }

  select(Count:any)
  {
    //console.log(Count.target.value);
    this.questionCount = Count.target.value
    
  }


 
  onSubmit()
  {
    this.AddForm.get('options')?.setValue(this.optionArray);

    console.log(this.AddForm.value);
    
    //this.toastr.success('Success', 'Question added successfully');
    //this.fetch.postdata(this.AddForm.value).subscribe(()=>{
    //})
    //this.router.navigate(['/question'])
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
  changeTopic(id:any){
    console.log(id.target.value);
    this.subjectId = id.target.value
    this.topicData()
  }
}

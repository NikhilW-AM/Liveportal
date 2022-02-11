import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  subjectobj:any
  subjectArray:any[]=[]
  questionCount:any
  topicObject:any
  topicArray?:any[]
  questionType:any[] = ['MULTIPLE CHOICE', 'MULTIPLE RESPONSE', 'FILL IN THE BLANKS']
  difficultyLevel:any[]=['Easy','Medium',"Hard"]
  isValid:boolean = false
  optionType : string = "MULTIPLE CHOICE"
  optionArray:any[]=[]
  questiondata: any;
  quesData : any
  questionId:any
  subjectId:any 

    
  constructor(private fetch : FetchdataService,  private fb:FormBuilder,private router:ActivatedRoute,private toastr:ToastrService,private rout:Router) {}
    
  AddForm = this.fb.group({  
    diffLevel:['',Validators.required],
    options: this.fb.array(this.optionArray.map(contact => this.createContact(contact))) ,  
    questionText:[''],
    rightMarks:[''],
    subject:[''],
    topic:[''],
    type:[''],
    wrongMarks:['']
  });  
      

  createContact(contact:any):FormGroup{

    return this.fb.group({
     option : [contact.option],
     isCorrect: [contact.isCorrect],
     richTextEditor:[contact.richTextEditor]
   })}

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
    this.router.paramMap.subscribe((params:ParamMap)=>{this.questionId  = params.get('eid');});
    console.log(this.questionId);
    this.getQuestionObject()
    this.subjectData()
  }

  setValuesById(){
    this.AddForm.controls['diffLevel'].setValue(this.questiondata.diffLevel) 
    this.AddForm.controls['questionText'].setValue(this.questiondata.questionText) 
    this.AddForm.controls['rightMarks'].setValue(this.questiondata.rightMarks) 
    this.AddForm.controls['subject'].setValue(this.questiondata.subject._id) 
    this.AddForm.controls['topic'].setValue(this.questiondata.topic._id) 
    this.AddForm.controls['type'].setValue(this.questiondata.type) 
    this.AddForm.controls['wrongMarks'].setValue(this.questiondata.wrongMarks) 

    for(let i=0; i<this.questiondata.options.length; i++)
    {
      ((this.AddForm.controls['options']as FormArray).at(i) as FormGroup).get('option')?.setValue(this.questiondata.options[i].option),
      ((this.AddForm.controls['options']as FormArray).at(i) as FormGroup).get('isCorrect')?.setValue(this.questiondata.options[i].isCorrect)
    }
  }

  onChange(i: number) {
    
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


  getQuestionObject()
  {
    this.fetch.geteditQuestionData(this.questionId).subscribe(data => {
      this.questiondata = data
      console.log(this.questiondata.topic.name)

      for(let i=0; i<this.questiondata.options.length; i++)
      {
        this.addQuantity()
      }
      this.setValuesById()
    })
  }

  subjectData(){
    this.fetch.getSubject().subscribe(data => {this.subjectobj = data,
       this.subjectArray = this.subjectobj.result
    })
  }


  subject(val:any)
  {
    this.subjectId = val.target.value
    this.topicData(this.subjectId)
  }

  topicData(id:any)
  {
  this.fetch.getTopicData(id).subscribe((topic:any) =>{
    
    this.topicArray = topic
  })
  }

  onSubmit()
  {
    console.log(this.AddForm.value);
    this.toastr.success('Success', 'Question updated successfully');
    this.fetch.putdata(this.AddForm.value,this.questionId).subscribe()
    this.rout.navigate(['/question'])
  }
  
  
  changeType(event:any){
    this.optionType = event.target.value 
  }

}
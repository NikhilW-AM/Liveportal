import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';

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
  topicArray:any[] =[]
  questionType:any[] = ['MULTIPLE CHOICE', 'MULTIPLE RESPONSE', 'FILL IN THE BLANKS']
  difficultyLevel:any[]=['Easy','Medium',"Hard"]
  isValid:boolean = false
  optionType : string = "MULTIPLE CHOICE"
  optionArray:any[]=[
    {option: false,textoption: ''},
    {option: false,textoption: ''},
    {option: false,textoption: ''},
    {option: false,textoption: ''}]
  questiondata: any;
  quesData : any
  questionId:any
    

    
    constructor(private fetch : FetchdataService,  private fb:FormBuilder,private router:ActivatedRoute) {}
    
    AddForm = this.fb.group({  
      diffLevel:['',Validators.required],
      quantities: this.fb.array(this.optionArray.map(contact => this.createContact(contact))) ,  
      questionText:[''],
      rightMarks:[''],
      subject:[''],
      topic:[''],
      type:[''],
      wrongMarks:['']
    });  
      
  setValuesById(){
    this.AddForm.controls['diffLevel'].setValue(this.questiondata.diffLevel) 
    this.AddForm.controls['questionText'].setValue(this.questiondata.questionText) 
    this.AddForm.controls['rightMarks'].setValue(this.questiondata.rightMarks) 
    this.AddForm.controls['subject'].setValue(this.questiondata.subject.name) 
    this.AddForm.controls['topic'].setValue(this.questiondata.topic.name) 
    this.AddForm.controls['type'].setValue(this.questiondata.type) 
    this.AddForm.controls['wrongMarks'].setValue(this.questiondata.wrongMarks) 
     
  }

    createContact(contact:any):FormGroup{
     return this.fb.group({
       option : [contact.option],
       textoption:[contact.textoption]
     })
    }
    quantities() : FormArray {  
      return this.AddForm.get("quantities") as FormArray  
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
    this.router.paramMap.subscribe((params:ParamMap)=>{this.questionId  = params.get('eid');});
    
    this.getData()
    this.subjectData()
    this.topicData()
    
    
  }
  subjectData(){
    this.fetch.getSubject().subscribe(data => {this.subjectobj = data,
       this.subjectArray = this.subjectobj.result
       
    })
  }
  topicData()
  {
    this.fetch.getTopicData().subscribe(topic => {this.topicObject = topic,
    this.topicArray = this.topicObject.result});
  }

  select(Count:any)
  {
   
    this.questionCount = Count.target.value
    
  }

  onSubmit()
  {
    console.log('hu');
    
  }
  fun(i:number)
  {
    console.log(i);
  }

  isTrue(index:number,value:number){
    this.optionArray[index].option = true
    console.log(this.optionArray);
    
  }

  changeType(event:any){
    this.optionType = event.target.value 
  }

  changeOption(index:any)
  {
    this.optionArray.map((o,opt) => {
      opt === index ? o.option=true : o.option=false
    })

    console.log(this.optionArray);
    
  }

  

  getData()
  {
    this.fetch.geteditQuestionData(this.questionId).subscribe(data => {
      this.questiondata = data
      console.log(this.questiondata);
      this.setValuesById()
    })
  }
}

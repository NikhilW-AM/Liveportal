import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms' 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
qsize : any = 4
name = 'Angular';  

contacts: any[] = [{
  option: '',
  textoption: ''
}, {
  option: '',
textoption: ''
},{
  option: '',
textoption: ''
}];
counter(i: number)
{
  return new Array(i);
}
addOption()
{
  this.qsize++;
}

productForm: FormGroup;  
   
constructor(private fb:FormBuilder) {  
   
  this.productForm = this.fb.group({  
    name: '',  
    quantities: this.fb.array(this.contacts.map(contact => this.createContact(contact))) ,  
  });  
}  
  
createContact(contact:any):FormGroup{
 return this.fb.group({
   option : [contact.option],
   textoption:[contact.textoption]
 })
}
quantities() : FormArray {  
  return this.productForm.get("quantities") as FormArray  
}  
   
newQuantity(): FormGroup {  
  return this.fb.group({  
    option: '',  
    textoption: '',  
  })  
}  
   
addQuantity() {  
  this.quantities().push(this.newQuantity());  
}  
   
removeQuantity(i:number) {  
  this.quantities().removeAt(i);  
}  
   
onSubmit() {  
  console.log(this.productForm.value);  
}  

remove(i:number)
{
    this.quantities().removeAt(i)
}
}

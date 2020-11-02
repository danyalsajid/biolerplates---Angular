import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.css']
})
export class TemplateDrivenFormsComponent implements OnInit {

  username = "";
  genders = ["male", "female"];
  defaultQuestion = "pet";

  @ViewChild('f') f: NgForm;

  constructor(){}

  ngOnInit() {
   
  }

  suggest(){
    this.f.form.patchValue({
      gender: 'male',
    })
  }

  onSubmit(){
    console.log(this.f.value.email);
    this.f.reset();
  }

}

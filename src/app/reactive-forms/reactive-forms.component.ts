import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  genders = ["male", "female"];
  forbiddenUsernames = ["Anna", "Dan"];

  f: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.f = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'gender': new FormControl('male'),
      // 'hobbies': new FormArray([])
      'hobbies': new FormArray([new FormControl(null, Validators.required)]) // when pre-population the values
    });

    // this.f.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // this.f.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });

    this.f.setValue({
      'username': 'danyal',
      'email': 'dan@gmail.com',
      'gender': 'male',
      'hobbies': ['nothing']
    });

    this.f.patchValue({
      'username': 'Dan'
    })

  }

  addHobbies() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.f.get('hobbies')).push(control);
  }

  // custom validator
  forbiddenNames(controls: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(controls.value) !== -1) {
      return { 'nameIsForbidden': true }
    }
    return null;
  }

  // custom asynchronous validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }

  onSubmit() {
    console.log(this.f.value)
    this.f.reset({
      'gender': 'male'
    });
  }


}

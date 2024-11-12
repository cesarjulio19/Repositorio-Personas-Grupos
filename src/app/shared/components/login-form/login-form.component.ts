import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  formGroup:FormGroup;
  constructor(private fb:FormBuilder) { 
    this.formGroup = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    });

  }

  get email(){
    return this.formGroup.controls['email'];
  }

  get password(){
    return this.formGroup.controls['password'];
  }

  getDirtyValues(formGroup: FormGroup): any {
    const dirtyValues: any = {};
  
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control?.dirty) {
        dirtyValues[key] = control.value;
      }
    });
  
    return dirtyValues;
  }

  onSubmit(){

    if(this.formGroup.valid){

      const formData = this.formGroup.value;
      this.formSubmitted.emit(formData)
  
    }


  }



  ngOnInit() {}

}

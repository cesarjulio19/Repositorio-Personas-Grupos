import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const passwordsMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  genders:string[] = ['Masculino', 'Femenino', 'Otros'];
  formGroup:FormGroup;
  constructor(private fb:FormBuilder) { 
    this.formGroup = this.fb.group({
      username:['', [Validators.required, Validators.minLength(2)]],
      name:['', [Validators.required, Validators.minLength(2)]],
      surname:['', [Validators.required, Validators.minLength(2)]],
      gender:['', [Validators.required]],
      birthdate:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]],
      confirmPassword:['', [Validators.required]]
    },
    { validators: passwordsMatchValidator }
  );
  }

  get email(){
    return this.formGroup.controls['email'];
  }

  get password(){
    return this.formGroup.controls['password'];
  }

  get confirmPassword(){
    return this.formGroup.controls['confirmPassword'];
  }

  get username(){
    return this.formGroup.controls['username'];
  }

  get  name(){
    return this.formGroup.controls[' name'];
  }

  get surname(){
    return this.formGroup.controls['surname'];
  }

  get gender(){
    return this.formGroup.controls['gender'];
  }

  get birthdate(){
    return this.formGroup.controls['birthdate'];
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



  ngOnInit() {}

  onSubmit(){

    if(this.formGroup.valid){
      const formData = this.formGroup.value;
      this.formSubmitted.emit(formData)

    }


  }

}

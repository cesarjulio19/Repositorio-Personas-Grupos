import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/impl/auth.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit() {
  }

  Login(){
    this.router.navigate(['/login']);
  }
  

  Home(){
    this.router.navigate(['/home']);
  }

  onFormSubmitted(formData: any) {
    const user: User = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    this.authSvc.register(user).subscribe({
      next:res=>{
        this.Home();
      },
      error:err=>{}
    }
    )
    
  }
  

}

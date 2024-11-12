import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/impl/auth.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit() {
  }

    Home() {
      this.router.navigate(['/home']);
    }

    Register() {

      this.router.navigate(['/register']);
    }

    onFormSubmitted(formData: any) {
  
      this.authSvc.login(formData.email, formData.password).subscribe({
        next:res=>{
          this.Home();
        },
        error:err=>{}
      }
      )
      
    }

}

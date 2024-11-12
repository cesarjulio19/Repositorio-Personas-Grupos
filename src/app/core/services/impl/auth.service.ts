import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/auth-service.interface';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService<User> {

  constructor() { }

  login(email: string, password:string): Observable<User> {
    const user : User = {
       username: 'sadasd',
       email: email,
       password: password
    }
    return of(user);
  }
  register(entity: User): Observable<User> {
    return of(entity);
  }
}

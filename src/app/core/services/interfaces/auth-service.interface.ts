import { Observable } from "rxjs";






export interface IAuthService<T> {
    login(email: string, password:string): Observable<T>;
    register(entity: T): Observable<T>
}
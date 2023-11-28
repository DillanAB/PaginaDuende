import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from 'src/interfaces/IUserLogin';
import { IUserRegister } from 'src/interfaces/IUserRegister';
import { NOTIFICATION_URL, USER_LOGIN_URL, USER_REGISTER_URL } from 'src/shared/constants/urls';
import { NNotification } from 'src/shared/models/Notification';
import { User } from 'src/shared/models/User';

const USER_KEY = 'User'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable:Observable<User>
  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable()
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user:User) =>{
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(`¡Bienvenido!, ${user.name}`)
        },
        error: (errorResponse:any) => {
          this.toastrService.error(errorResponse.error, 'No se pudo iniciar sesión')
        }
      })
    )
  }

  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(`¡Bienvenido!, ${user.name}`, 'Usuario registrado')
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'No se pudo registrar el usuario')
        }
      })
    )
  }

  //Obtiene las notificaciones de un usuario
  getNotifications(userId:string):Observable<NNotification[]>{
    return this.http.get<NNotification[]>(NOTIFICATION_URL + userId)
  }

  isAdmin():boolean{
    return this.userSubject.value.isAdmin
  }

  logout(){
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.href = '/'
  }

  private setUserToLocalStorage(user:User):void{
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY)
    if(userJson){
      return JSON.parse(userJson)
    }
    else{
      return new User()
    }
  }
}

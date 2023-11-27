import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NNotification } from 'src/shared/models/Notification';
import { Observable } from 'rxjs';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent {
  notifications: NNotification[] = []
  user!:User

  constructor(private userService:UserService) {
      userService.userObservable.subscribe((newUser:User) => {
        this.user = newUser
      })

      let notiObservable:Observable<NNotification[]>
      notiObservable = userService.getNotifications(this.user.id)

      notiObservable.subscribe((serverCart) => {
        this.notifications = serverCart
      })
   }

   removeNoti(notification: NNotification){
     // this.userService.deleteNotification(notification.id)
   }

   pr(){
      alert()
   }
}

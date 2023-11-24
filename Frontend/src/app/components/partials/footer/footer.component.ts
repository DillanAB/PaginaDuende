import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  user!:User
  
  constructor(private userService:UserService){
    userService.userObservable.subscribe((newUser:User) => {
      this.user = newUser
    })
  }
  ngOnInit(): void {
  }
}

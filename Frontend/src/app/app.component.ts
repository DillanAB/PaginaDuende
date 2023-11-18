import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  constructor(private userService:UserService){}

  isAdmin():boolean{
    return this.userService.isAdmin()
  }
}

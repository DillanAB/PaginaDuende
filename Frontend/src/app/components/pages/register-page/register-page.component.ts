import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/interfaces/IUserRegister';
import { PasswordMatchValidator } from 'src/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm!:FormGroup
  isSubmitted = false
  returnURL = ''

  constructor(private formBuilder:FormBuilder, private userService:UserService,
    private activatedRoute:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', [Validators.required]],
      },{
        validators: PasswordMatchValidator('password', 'confirmPassword')	
      }
    )
    this.returnURL = '/gallery'
  }

  get fc() {
    return this.registerForm.controls
  }

  submit(){
    this.isSubmitted = true
    if(this.registerForm.invalid) return

    const fv = this.registerForm.value

    const user:IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword
    }

    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnURL)
    })
  }
}

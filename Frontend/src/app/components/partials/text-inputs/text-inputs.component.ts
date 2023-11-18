import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-inputs',
  templateUrl: './text-inputs.component.html',
  styleUrls: ['./text-inputs.component.css']
})
export class TextInputsComponent implements OnInit {

  @Input()
  control!:AbstractControl
  @Input()
  showErrorsWhen:boolean = true
  @Input()
  label!: string
  @Input()
  type: 'text' | 'password' | 'number' | 'email' = 'text'
  @Input()
  autocomplete: 'on' | 'off' = 'on'

  constructor() {}


  get formControl() {
    return this.control as FormControl
  }
  
  ngOnInit(): void {
      
  }
}

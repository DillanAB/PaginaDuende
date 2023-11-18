import { Component, OnChanges, OnInit, Input, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required: 'No puede estar vacío',
  email: 'Debe ser un email válido'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

  @Input()
  control!:AbstractControl
  @Input()
  showErrorsWhen:boolean = true
  errorMessages:string[] = []

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation() 
    })
    this.control.valueChanges.subscribe(() => {
      this.checkValidation()
    })
  }

  checkValidation(){
    const errors = this.control.errors
    if(!errors){
      this.errorMessages = [] 
      return
    }
    const errorKeys = Object.keys(errors)
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]) 
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})
export class DefaultButtonComponent implements OnInit{
  @Input()
  type:'submit' | 'button' = 'submit'
  @Input()
  text:string = 'Enviar'
  @Input()
  bgColor:string = 'bg-blue-500'
  @Input()
  color = 'black'
  @Input()
  fontSizeRem = 1.4
  @Input()
  widthRem = 12
  @Output()
  onClick = new EventEmitter()

  constructor () { }

  
  ngOnInit(): void {}

}

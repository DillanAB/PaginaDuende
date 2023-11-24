import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  Events = []


  onDateClick(res:{dateStr:string}) {
    alert('You clicked on :' + res.dateStr)
  }

  constructor(){}

  ngOnInit(){
    setTimeout(()=>{
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick:this.onDateClick.bind(this),
        events: this.Events
      }
    }, 3500)
  }
}

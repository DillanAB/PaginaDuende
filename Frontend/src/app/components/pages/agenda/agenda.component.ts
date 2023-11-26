import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, Calendar, EventSourceInput, EventAddArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  
  id:number = 1;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  calendar!:Calendar;
  daySelected!:string;
  selectOption:boolean = false;
  start!:string;
  end!:string;

  constructor(){}
  
  Events = [
    {
      id: '1',
      title: 'BCH237',
      start: '2023-11-12T10:30:00',
      end: '2023-11-13T11:30:00',
      color: 'red'
    },
    {
      id: '2',
      title: 'Evnto malo',
      start: '2023-11-12T11:00:00',
      end: '2023-11-12T12:00:00',
      color: 'green'
    }
  ];

  // onDateClick(res:{dateStr:string}) {
  //   const buttonAdd = document.getElementsByName('buttonAgregar');
  //   buttonAdd.forEach(function(button){
  //     (button as HTMLButtonElement).disabled = false;
  //   })
  //   this.daySelected = res.dateStr;
  // }

  onDateClick(res:{dateStr:string}) {
    this.calendarOptions.events = this.Events;
  }

  onSelect(res:{startStr:string, endStr:string}) {
    if (!this.selectOption){
      const buttonAdd = (document.getElementsByName('buttonAgregar'));
      buttonAdd.forEach(function(button){
        (button as HTMLButtonElement).disabled = false;
      })
    }
    
    this.start = res.startStr.replace('-06:00',"");
    this.end = res.endStr.replace('-06:00',"");

    const splitStart = this.start.split('T')

    const day = splitStart[0];
    const startTime = splitStart[1];
    const endTime = this.end.split('T')[1];

    (document.getElementById('dayEvent') as HTMLInputElement).value = day;
    (document.getElementById('startTime') as HTMLInputElement).value = startTime;
    (document.getElementById('endTime') as HTMLInputElement).value = endTime;
  }

  actionClick(){
    var titleEvent = (document.getElementById('title') as HTMLInputElement).value
    const event = {
      id: this.id.toString(),
      title: titleEvent,
      start: this.start,
      end: this.end,
      color: 'cornflowerblue'
    }
    this.Events.push(event);

    if (this.calendarComponent){
      let calendarApi = this.calendarComponent.getApi();
      calendarApi.addEvent(event);
    }
  }

  onUnSelect() {
    if (!this.selectOption){
      const buttonAdd = (document.getElementsByName('buttonAgregar'));
      buttonAdd.forEach(function(button){
        (button as HTMLButtonElement).disabled = true;
      })
    }
  }

  ngOnInit(){
    // if (this.calendarComponent)
    //   this.calendar = this.calendarComponent.getApi();
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    //initialView: 'timeGridWeek',
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    navLinks:true,
    dateClick: this.onDateClick.bind(this),
    select: this.onSelect.bind(this),
    unselect: this.onUnSelect.bind(this),
    events: this.Events,
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin]
  };
}

// var calendarEl = document.getElementById('calendar');
    // alert(calendarEl);
    // if (calendarEl)
    //   this.calendar = new Calendar(calendarEl, this.calendarOptions)

    // var containerEl = document.getElementById('external-events');
    // if (containerEl){
    //    new Draggable(containerEl, {
    //     itemSelector: '.fc-event',
    //     eventData: function(eventEl) {
    //       return {
    //         title: eventEl.innerText,
    //       };
    //     }
    //   });
    // }
    // var x = this.Events[0]
    // var y = this.Events[3]
    // if (x.start && y.start && x.end && y.end)
    //   if ((x.start < y.end && x.start > y.start) || (x.end < y.end && x.end > y.start))
    //     alert('problemas')
    
    // var z = this.calendar.getEventById('1')?.title; 
    // alert(z)
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
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  calendar!:Calendar;
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
      id: 'Curso',
      title: 'Evnto malo',
      start: '2023-11-12T11:00:00',
      end: '2023-11-12T12:00:00',
      color: 'green'
    }
  ];

  onSelect(res:{startStr:string, endStr:string}) {
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

  evaluate(){
    const startTime = (document.getElementById('startTime') as HTMLInputElement).value
    const endTime = (document.getElementById('endTime') as HTMLInputElement).value
    const dayEvent = (document.getElementById('dayEvent') as HTMLInputElement).value
    const title = (document.getElementById('title') as HTMLInputElement).value
    
    if (startTime != '')
      if (endTime != '')
        if (dayEvent != '')
          if (title != ''){
            this.start = dayEvent + 'T' + startTime
            this.end = dayEvent + 'T' + endTime
            const buttonAdd = (document.getElementsByName('buttonAgregar'));
            buttonAdd.forEach(function(button){
              (button as HTMLButtonElement).disabled = false;
            })
          }
  }

  chooseColor(type: string): string {
    var colorEvent:string = '';
    switch(type){
      case 'Maquillaje': {
        colorEvent = 'cornflowerblue';
        break;
      }
      case 'Curso': {
        colorEvent = 'green';
        break;
      }
      case 'Entrega': {
        colorEvent = 'red';
        break;
      }
    }
    return colorEvent;
  }

  actionClick(type:string){
    var titleEvent = (document.getElementById('title') as HTMLInputElement).value
    const event = {
      id: type,
      title: titleEvent,
      start: this.start,
      end: this.end,
      color: this.chooseColor(type)
      
    }

    for (let i = 0; i < this.Events.length; i++) {
      const eventRegistered = this.Events[i]
      if ((event.start < eventRegistered.end && event.start > eventRegistered.start)
       || (event.end < eventRegistered.end && event.end > eventRegistered.start)
       || (event.start == eventRegistered.start && event.end >= eventRegistered.end))
        if(eventRegistered.id == 'Maquillaje' || event.id == 'Maquillaje'){
          alert("ERROR: El evento que se está tratando de registrar colisiona con un servicio de maquillaje, lo cual no es posible");
          return
        }
        else{
          const confirmed = confirm("El evento que se está tratando de registrar colisiona con otro. Desea agregarlo de todas maneras");
          if(!confirmed)
            return
        }
    }

    this.Events.push(event);

    if (this.calendarComponent){
      let calendarApi = this.calendarComponent.getApi();
      calendarApi.addEvent(event);
      
    }
    
  }

  onUnSelect() {
    if (this.calendarComponent){
      let calendarApi = this.calendarComponent.getApi();
      const x = calendarApi.getEventById('1');
    }
  }

  onEventClick(){//res{event: any}){

  }

  ngOnInit(){

  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    //initialView: 'timeGridWeek',
    initialView: 'dayGridMonth',
    //editable: true,
    selectable: true,
    navLinks:true,
    select: this.onSelect.bind(this),
    unselect: this.onUnSelect.bind(this),
    eventClick: function(info){
      alert('Event: ' + info.event.title);
      //info.event.title = 'r';
    }, 
    //this.onEventClick.bind(this),
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
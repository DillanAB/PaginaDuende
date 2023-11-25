import { Component } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  
  constructor(){}

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'timeGridWeek',
    editable: true,
    navLinks:true,
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin]
  };

  eventData(eventEl: HTMLElement){
    var singleslot = (document.getElementById("singleslot") as HTMLDivElement);
  }

  ngOnInit(){
    var containerEl = document.getElementById('external-events');
    if (containerEl){
      new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function(eventEl) {
          return {
            title: eventEl.innerText,
          };
        }
      });
    }
  }
}

/*
export class AgendaComponent {
  
  eventosList:string[] = ['My Event 1', 'My Event 2', 'My Event 3', 'My Event 4', 'My Event 5'];

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    editable: true,
    navLinks:true,
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin]
  };

  // Events = []


  // onDateClick(res:{dateStr:string}) {
  //   alert('Date clicked '+ res.dateStr)
  // }

  // unSelect(){
  //   const buttonAdd = document.getElementsByName('buttonAgregar');
  //   buttonAdd.forEach(function(button){
  //     (button as HTMLButtonElement).disabled = false;
  //   })
  // }

  // onUnSelect() {
  //   const buttonAdd = (document.getElementsByName('buttonAgregar'));
  //   buttonAdd.forEach(function(button){
  //     (button as HTMLButtonElement).disabled = true;
  //   })
  // }

  constructor(){}

  ngOnInit(){
    // const buttonAdd = document.getElementsByName('buttonAgregar');
    // buttonAdd.forEach(function(button){
    //   (button as HTMLButtonElement).disabled = true;
    // })
    // setTimeout(()=>{
    //   this.calendarOptions = {
    //     initialView: '',
    //     selectable: true,
    //     select:this.unSelect.bind(this),
    //     unselect: this.onUnSelect.bind(this),
    //     dateClick: this.onDateClick.bind(this),
    //     events: this.Events
    //   }
    // })

    var containerEl = document.getElementById('external-events');
    if (containerEl){
      new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function(eventEl) {
          alert(eventEl.innerText + "       " + containerEl?.innerText)
          return {
            title: eventEl.innerText
          };
        }
      });
      alert(x.toString())
    }
  }
}
*/
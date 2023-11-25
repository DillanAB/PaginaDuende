import { Component } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

document.addEventListener('page', function() {

  var containerEl = document.getElementById('external-events');
  var calendarEl = document.getElementById('calendar');
  var checkbox = document.getElementById('drop-remove') as HTMLInputElement;

  // initialize the external events
  // -----------------------------------------------------------------
  if (containerEl != null) {
    new Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    });
  }

  // initialize the calendar
  // -----------------------------------------------------------------
  if (calendarEl != null) {
    var calendar = new Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      drop: function(info) {
        // is the "remove after drop" checkbox checked?
        if (checkbox != null && checkbox.checked && info.draggedEl.parentNode != null) {
          // if so, remove the element from the "Draggable Events" list
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
      }
    });
    calendar.render();
  }

  
});


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    drop: function(info){
      var checkbox = document.getElementById('drop-remove') as HTMLInputElement;
      if (checkbox && checkbox.checked && info.draggedEl.parentNode) {
        // if so, remove the element from the "Draggable Events" list
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },
    //initialView: 'dayGridMonth',
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin]
  };

  Events = []


  onDateClick(res:{dateStr:string}) {
    alert('Date clicked '+ res.dateStr)
  }

  unSelect(){
    const buttonAdd = document.getElementsByName('buttonAgregar');
    buttonAdd.forEach(function(button){
      (button as HTMLButtonElement).disabled = false;
    })
  }

  onUnSelect() {
    const buttonAdd = (document.getElementsByName('buttonAgregar'));
    buttonAdd.forEach(function(button){
      (button as HTMLButtonElement).disabled = true;
    })
  }

  constructor(){}

  ngOnInit(){
    // const buttonAdd = document.getElementsByName('buttonAgregar');
    // buttonAdd.forEach(function(button){
    //   (button as HTMLButtonElement).disabled = true;
    // })
    setTimeout(()=>{
      this.calendarOptions = {
        initialView: '',
        selectable: true,
        select:this.unSelect.bind(this),
        unselect: this.onUnSelect.bind(this),
        dateClick: this.onDateClick.bind(this),
        events: this.Events
      }
    })

    var containerEl = document.getElementById('external-events');
    if (containerEl)
      new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function(eventEl) {
          return {
            title: eventEl.innerText
          };
        }
      });
  }
}

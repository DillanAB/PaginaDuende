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
  start!:string;
  end!:string;
  infoEventId!:string;

  constructor(){}
  
  Events:any[] = [//];
    {
      id: 1,
      title: 'BCH237',
      start: '2023-11-13T10:30:00',
      end: '2023-11-13T11:30:00',
      color: 'red',
      type: 'Entrega'
    },
    {
      id: 2,
      title: 'Evnto malo',
      start: '2023-11-12T11:00:00',
      end: '2023-11-12T12:00:00',
      color: 'green',
      type: 'Curso'
    }
  ];

  id: number = this.Events.length + 1;

  /* Extra functions */
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

  createEvent(title: string, type:string){
    const event = {
      id: this.id,
      title: title,
      start: this.start,
      end: this.end,
      color: this.chooseColor(type),
      type: type
    };
    this.id++;
    return event;
  }

  colisionesPosibles(eventRegistered:any){
    return ((this.start < eventRegistered.end && this.start > eventRegistered.start)
         || (this.end < eventRegistered.end && this.end > eventRegistered.start)
         || (this.start == eventRegistered.start && this.end >= eventRegistered.end))
  }

  /* Control events */
  addEvent(event:any){
    if (this.calendarComponent){
      let calendarApi = this.calendarComponent.getApi();
      calendarApi.addEvent(event);
    }
    this.Events.push(event);
  }

  editEvent(event:any){
    this.deleteEvent();

    if (this.calendarComponent){
      let calendarApi = this.calendarComponent.getApi();
      calendarApi.addEvent(event);
    }
    this.Events.push(event);
  }

  deleteEvent(){
    if (this.calendarComponent){
      let calendarApi = this.calendarComponent.getApi();
      calendarApi.getEventById(this.infoEventId)?.remove();
    }

    for (let i = 0; i < this.Events.length; i++) {
      if (this.Events[i].id = this.infoEventId){
        this.Events.splice(i, 1)
      }
    }
  }

  actionClick(type:string){
    var titleEvent = (document.getElementById('title') as HTMLInputElement).value;
    const event = this.createEvent(titleEvent,type);

    for (let i = 0; i < this.Events.length; i++) {
      const eventRegistered = this.Events[i]

      if (this.colisionesPosibles(eventRegistered)){

        if(eventRegistered.type == 'Maquillaje' || event.type == 'Maquillaje'){
          alert("ERROR: El evento que se está tratando de registrar es o colisiona con un servicio de maquillaje, lo cual no es posible  ");
          return
        }
        else{
          const confirmed = confirm("El evento que se está tratando de registrar colisiona con otro. Desea agregarlo de todas maneras");
          if(!confirmed)
            return
          else break
        }
      }
    }
    this.addEvent(event);
    this.resetConfigurations();
  }

  editClick(){
    const config = this.getConfigurations();
    const titleEvent = config[0], dayEvent = config[1], startTime = config[2], endTime = config[3];

    this.start = dayEvent + 'T' + startTime;
    this.end = dayEvent + 'T' + endTime;

    var event;
    for (let i = 0; i < this.Events.length; i++){
      if (this.Events[i].id == this.infoEventId)
        event = this.Events[i];
    }

    event.title = titleEvent;
    event.start = this.start;
    event.end = this.end;
    
    this.editEvent(event);

    this.resetConfigurations();
  }

  deleteClick(){
    this.deleteEvent();
    this.resetConfigurations();
  }


  /* HTML Elements Events Control */
  onSelect(res:{startStr:string, endStr:string}) {
    
    this.start = res.startStr.replace('-06:00',"");
    this.end = res.endStr.replace('-06:00',"");
    
    const splitStart = this.start.split('T')
    
    const day = splitStart[0];
    const startTime = splitStart[1];
    const endTime = this.end.split('T')[1];
    
    this.setConfigurations('',day,startTime,endTime);
    this.setStateButtons_Edit_Delete(true);
  }

  evaluate(){
    const config = this.getConfigurations();
    const title = config[0], dayEvent = config[1], startTime = config[2], endTime = config[3]; 
    
    if (startTime != '' && endTime != '' && dayEvent != '' && title != '') {
      this.start = dayEvent + 'T' + startTime
      this.end = dayEvent + 'T' + endTime
      this.controlButtonsAdd(false);
    }
    else
      this.controlButtonsAdd(true);
  }

  onUnSelect() {
  }
  
  onEventClick(info: any){
    this.infoEventId = info.event.id;

    const startSplit = info.event.startStr.split('T');
    const dayEvent = startSplit[0];
    const startTime = startSplit[1].split('-')[0];
    const endSplit = info.event.endStr.split('T');
    const endTime = endSplit[1].split('-')[0];

    this.setConfigurations(info.event.title, dayEvent, startTime, endTime);
    this.setStateButtons_Edit_Delete(false);
  }

  
  /* HTML Elements Data Control */
  controlButtonsAdd(active: boolean){
    const buttonAdd = (document.getElementsByName('buttonAgregar'));
    buttonAdd.forEach(function(button){
      (button as HTMLButtonElement).disabled = active;
    })
  }

  resetConfigurations(){
    (document.getElementById('title') as HTMLInputElement).value = '';
    (document.getElementById('startTime') as HTMLInputElement).value = '';
    (document.getElementById('endTime') as HTMLInputElement).value = '';
    (document.getElementById('dayEvent') as HTMLInputElement).value = '';

    this.setStateButtons_Edit_Delete(true);
    this.controlButtonsAdd(true);
  }

  setConfigurations(title:string, dayEvent:string, startTime:string, endTime:string){
    (document.getElementById('title') as HTMLInputElement).value = title;
    (document.getElementById('startTime') as HTMLInputElement).value = startTime;
    (document.getElementById('endTime') as HTMLInputElement).value = endTime;
    (document.getElementById('dayEvent') as HTMLInputElement).value = dayEvent;
  }

  getConfigurations(){
    const title = (document.getElementById('title') as HTMLInputElement).value
    const dayEvent = (document.getElementById('dayEvent') as HTMLInputElement).value
    const startTime = (document.getElementById('startTime') as HTMLInputElement).value
    const endTime = (document.getElementById('endTime') as HTMLInputElement).value
    
    return [title, dayEvent, startTime, endTime]
  }

  setStateButtons_Edit_Delete(active: boolean){
    (document.getElementById('editEvent') as HTMLButtonElement).hidden = active;
    (document.getElementById('deleteEvent') as HTMLButtonElement).hidden = active;
  }

  ngOnInit(){
    
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    selectable: true,
    navLinks:true,
    select: this.onSelect.bind(this),
    unselect: this.onUnSelect.bind(this),
    eventClick: this.onEventClick.bind(this),
    //this.onEventClick.bind(this),
    events: this.Events,
    eventMouseEnter: function(info) {
      info.el.style.cursor = 'pointer';
    },
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin]
  };
}
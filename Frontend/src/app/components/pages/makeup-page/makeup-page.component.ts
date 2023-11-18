import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery-service.service';
import { MakeupService } from 'src/shared/models/MakeupService';

@Component({
  selector: 'app-makeup-page',
  templateUrl: './makeup-page.component.html',
  styleUrls: ['./makeup-page.component.css']
})
export class MakeupPageComponent implements OnInit {
  makeup!:MakeupService

  constructor(activatedRoute:ActivatedRoute, galleryService:GalleryService){
    let makeupObservable:Observable<MakeupService>
    activatedRoute.params.subscribe((params) => {
      if(params.id){
        makeupObservable = galleryService.getMakeupServiceById(params.id)
      }

      makeupObservable.subscribe((serverServices) => {
          this.makeup = serverServices
        })
    })
  }
  ngOnInit(): void {}

}

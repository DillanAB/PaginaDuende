import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery-service.service';

describe('MakeupServiceService', () => {
  let service: GalleryService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

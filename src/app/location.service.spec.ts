import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LocationService } from './location.service';

describe('LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule
             ]
  }));

  it('should be created', () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });
});

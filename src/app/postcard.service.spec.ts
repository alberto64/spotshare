import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PostcardService } from './postcard.service';

describe('PostcardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule
             ]
  }));

  it('should be created', () => {
    const service: PostcardService = TestBed.get(PostcardService);
    expect(service).toBeTruthy();
  });
});

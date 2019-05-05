import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});

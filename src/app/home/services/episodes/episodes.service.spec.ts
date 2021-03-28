import { TestBed } from '@angular/core/testing';

import { EpisodesService } from './episodes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EpisodesService', () => {
  let service: EpisodesService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

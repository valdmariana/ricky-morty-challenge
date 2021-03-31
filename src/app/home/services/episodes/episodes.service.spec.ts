import { TestBed } from '@angular/core/testing';
import { EpisodesService } from './episodes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { episodes } from './episodes-data-fake.spec';

describe('EpisodesService', () => {
  let service: EpisodesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpisodesService]
    });
    service = TestBed.inject(EpisodesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it(`getEpisodes return a list of episodes and does a GET method`, () => {

    service.getEpisodes(1)
      .subscribe((response: any) => {
        expect(response).toEqual(episodes);
      });

    let results = { param: 'page', value: '1' };
    let url = `${GlobalConstants.apiURL}episode?${results.param}=${results.value}`

    let req = httpMock.expectOne(url);
    expect(req.request.method).toBe("GET");
    req.flush(episodes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

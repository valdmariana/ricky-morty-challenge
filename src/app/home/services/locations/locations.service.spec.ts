import { TestBed } from '@angular/core/testing';

import { LocationsService } from './locations.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { locations } from './locations-data-fake.spec';
import { GlobalConstants } from 'src/app/shared/global-constants';

describe('LocationsService', () => {
  let service: LocationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationsService]
    });
    service = TestBed.inject(LocationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`getLocations return a list of locations and does a GET method`, () => {

    service.getLocations(1)
      .subscribe((response: any) => {
        expect(response).toEqual(locations);
      });

    let results = { param: 'page', value: '1' };
    let url = `${GlobalConstants.apiURL}location?${results.param}=${results.value}`

    let req = httpMock.expectOne(url);
    expect(req.request.method).toBe("GET");
    req.flush(locations);
  });

});

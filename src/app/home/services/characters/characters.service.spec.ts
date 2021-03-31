import { TestBed } from '@angular/core/testing';
import { CharactersService } from './characters.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { characters } from "./characters-data-fake.spec"
import { GlobalConstants } from '../../../shared/global-constants';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CharactersService
      ],
    });

    service = TestBed.inject(CharactersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`getCharacters return a list of characters and does a GET method`, () => {

    service.getCharacters(1)
      .subscribe((response: any) => {
        expect(response).toEqual(characters);
      });

    let results = { param: 'page', value: '1' };
    let url = `${GlobalConstants.apiURL}character?${results.param}=${results.value}`

    let req = httpMock.expectOne(url);
    expect(req.request.method).toBe("GET");
    req.flush(characters);
  });

  it(`getCharacter return a character and does a GET method`, () => {

    service.getCharacter('1')
      .subscribe((response: any) => {
        expect(response).toEqual(characters.results[0]);
      });

    let url = `${GlobalConstants.apiURL}character/1`
    let req = httpMock.expectOne(url);
    expect(req.request.method).toBe("GET");
    req.flush(characters.results[0]);
  });


});

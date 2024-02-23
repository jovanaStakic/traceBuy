import { TestBed } from '@angular/core/testing';

import { ProdavniceDataService } from './prodavnice-data.service';

describe('ProdavniceDataService', () => {
  let service: ProdavniceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdavniceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

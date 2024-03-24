import { TestBed } from '@angular/core/testing';

import { ProductOriginService } from './product-origin.service';

describe('ProductOriginService', () => {
  let service: ProductOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

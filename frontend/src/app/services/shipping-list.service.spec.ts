import { TestBed } from '@angular/core/testing';

import { ShippingListService } from './shipping-list.service';

describe('ShippingListService', () => {
  let service: ShippingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DrawerToggleService } from './drawer-toggle.service';

describe('DrawerToggleService', () => {
  let service: DrawerToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

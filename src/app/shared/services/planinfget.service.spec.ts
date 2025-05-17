import { TestBed } from '@angular/core/testing';

import { PlaninfgetService } from './planinfget.service';

describe('PlaninfgetService', () => {
  let service: PlaninfgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaninfgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

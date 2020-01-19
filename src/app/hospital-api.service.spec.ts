import { TestBed } from '@angular/core/testing';
import { HospitalApiService } from './hospital-api.service';
describe('HospitalApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalApiService = TestBed.get(HospitalApiService);
    expect(service).toBeTruthy();
  });
});

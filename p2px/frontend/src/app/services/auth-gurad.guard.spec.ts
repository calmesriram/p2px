import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuradGuard } from './auth-gurad.guard';

describe('AuthGuradGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuradGuard]
    });
  });

  it('should ...', inject([AuthGuradGuard], (guard: AuthGuradGuard) => {
    expect(guard).toBeTruthy();
  }));
});

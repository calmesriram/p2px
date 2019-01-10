import { TestBed, inject } from '@angular/core/testing';

import { ScriptLoaderService } from './script-loader.service';

describe('ScriptLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptLoaderService]
    });
  });

  it('should ...', inject([ScriptLoaderService], (service: ScriptLoaderService) => {
    expect(service).toBeTruthy();
  }));
});

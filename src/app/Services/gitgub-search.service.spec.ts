import { TestBed } from '@angular/core/testing';

import { GitgubSearchService } from './gitgub-search.service';

describe('GitgubSearchService', () => {
  let service: GitgubSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitgubSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

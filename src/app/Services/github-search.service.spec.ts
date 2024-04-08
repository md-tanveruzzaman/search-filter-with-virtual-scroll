import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GitgubSearchService } from './gitgub-search.service';

describe('GitgubSearchService', () => {
  let service: GitgubSearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GitgubSearchService]
    });
    service = TestBed.inject(GitgubSearchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set language correctly', () => {
    const lang = 'typescript';
    service.setLanguage(lang);
    service.getLanguage().subscribe(data => {
      expect(data).toBe(lang);
    });
  });

  it('should set view correctly', () => {
    const isGridView = false;
    service.setView(isGridView);
    service.getSelectedView().subscribe(data => {
      expect(data).toBe(isGridView);
    });
  });

});

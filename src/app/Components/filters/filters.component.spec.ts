import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { GitgubSearchService } from 'src/app/Services/gitgub-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FiltersComponent, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [],
      providers: [GitgubSearchService]
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

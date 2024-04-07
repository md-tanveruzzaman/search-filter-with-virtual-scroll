import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { GitgubSearchService } from 'src/app/Services/gitgub-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DefaultFilterValue, ILanguage } from 'src/app/Models/github-search.model';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let githubService: GitgubSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FiltersComponent, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [],
      providers: [GitgubSearchService]
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GitgubSearchService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected language in services Observable', () => {
    spyOn(githubService, 'setLanguage');
    component.selectedLanguage = DummyLanguages[1].name as DefaultFilterValue;
    component.onChangeLanguage();
    expect(githubService.setLanguage).toHaveBeenCalled();
  });

  it('should update Sort Order in services Observable', () => {
    spyOn(githubService, 'setSortOrder');
    component.sortOrder = DefaultFilterValue.ORDER;
    component.onSelectSortOrder();
    expect(githubService.setSortOrder).toHaveBeenCalled();
  });
});

export const DummyLanguages: ILanguage[] = [
  {
    name: 'Javascript',
    aliases: ['js', 'javascript']
  },
  {
    name: 'Java',
    aliases: ['java']
  },
  {
    name: 'PHP',
    aliases: ['php']
  }
]

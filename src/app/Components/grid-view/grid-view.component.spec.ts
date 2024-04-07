import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GridViewComponent } from './grid-view.component';
import { GitgubSearchService } from 'src/app/Services/gitgub-search.service';

describe('GridViewComponent', () => {
  let component: GridViewComponent;
  let fixture: ComponentFixture<GridViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridViewComponent],
      imports: [ HttpClientTestingModule ],
      providers: [ GitgubSearchService ]
    });
    fixture = TestBed.createComponent(GridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

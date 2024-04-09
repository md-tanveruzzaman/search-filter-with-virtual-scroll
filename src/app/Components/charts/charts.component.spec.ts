import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsComponent } from './charts.component';
import { GitgubSearchService } from 'src/app/Services/gitgub-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsComponent],
      imports: [HttpClientTestingModule, BaseChartDirective],
      providers: [GitgubSearchService, provideCharts(withDefaultRegisterables())]
    });
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

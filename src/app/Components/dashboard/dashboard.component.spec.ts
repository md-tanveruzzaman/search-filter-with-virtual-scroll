import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FiltersComponent } from '../filters/filters.component';
import { GridViewComponent } from '../grid-view/grid-view.component';
import { GitgubSearchService } from 'src/app/Services/gitgub-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FiltersComponent, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [DashboardComponent, NavbarComponent, GridViewComponent],
      providers: [GitgubSearchService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

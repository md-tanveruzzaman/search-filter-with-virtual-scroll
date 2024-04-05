import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DefaultFilterValue, ILanguage } from 'src/app/Models/github-search.model';
import { GitgubSearchService } from 'src/app/Services/gitgub-search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, NgSelectModule, FormsModule, CommonModule],
})
export class FiltersComponent implements OnInit{

  selectedLanguage = DefaultFilterValue.LANG;
  sortOrder = DefaultFilterValue.ORDER;
  languages: ILanguage[] = [];

  constructor(
    private githubService: GitgubSearchService
  ) {

  }

  ngOnInit(): void {
    this.getAllLanguages();
  }

  private getAllLanguages() {
    this.githubService.getAllLanguages()
      .subscribe({
        next: (res) => {
          this.languages = res;
        },
        error: () => this.languages = []
      })
  }

  onSelectSortOrder() {
    if (this.sortOrder) {
      this.githubService.setSortOrder(this.sortOrder)
    }
  }

  onChangeLanguage() {
    if(this.selectedLanguage) {
      this.githubService.setLanguage(this.selectedLanguage)
    }
  }

}

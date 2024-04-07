import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GitgubSearchService } from 'src/app/Services/gitgub-search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isCardView = true;

  constructor(
    private githuvService: GitgubSearchService
  ) { }

  toggle(event: MatSlideToggleChange) {
    if (event) {
      this.githuvService.setView(this.isCardView);
    }
  }

}

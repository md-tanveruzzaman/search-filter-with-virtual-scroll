import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import { Observable, Subscription, debounceTime, fromEvent } from 'rxjs';
import { GitgubSearchService } from 'src/app/Services/gitgub-search.service';
import { BreakPoint, IGithubQuery, ViewPortSize } from 'src/app/Models/github-search.model';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {

  private static readonly FETCH_MINIMUM = 10
  @ViewChild(CdkVirtualScrollViewport)
  public viewPort?: CdkVirtualScrollViewport
  private readonly SM_SIZE = 20
  private readonly MD_SIZE = 30
  private readonly LG_SIZE = 40

  protected readonly query$: Observable<IGithubQuery>

  protected resizeObservable$?: Observable<Event>

  protected resizeSubscription$?: Subscription;

  private viewPortSize: ViewPortSize = ViewPortSize.LG

  public itemSize = this.LG_SIZE
  onScrollTriggered: boolean = false;
  isGridView: boolean = true;

  public constructor(
    private readonly gitgubSearchService: GitgubSearchService
  ) {
    this.query$ = this.gitgubSearchService.getQuery();
    this.gitgubSearchService.getSelectedView()
      .subscribe({
        next: (isGrid) => {
          this.isGridView = isGrid;
          this.onScroll('2')
        }
      })
  }

  public ngOnInit(): void {
    this.determineItemSize()

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.determineItemSize()
      })
  }

  public determineItemSize() {
    if (
      window.innerWidth < BreakPoint.MD &&
      this.viewPortSize !== ViewPortSize.MD
    ) {
      this.itemSize = this.MD_SIZE
      this.viewPortSize = ViewPortSize.MD
      this.viewPort?.checkViewportSize()
    } else if (
      window.innerHeight < BreakPoint.SM &&
      this.viewPortSize !== ViewPortSize.SM
    ) {
      this.itemSize = this.SM_SIZE
      this.viewPortSize = ViewPortSize.SM
      this.viewPort?.checkViewportSize()
    } else if (
      window.innerWidth > BreakPoint.MD &&
      this.viewPortSize !== ViewPortSize.LG
    ) {
      this.itemSize = this.LG_SIZE
      this.viewPortSize = ViewPortSize.LG
      this.viewPort?.checkViewportSize()
    }
  }

  public onScroll(nextPage?: string): void {
    if (this.viewPort && nextPage) {
      const end = this.viewPort.getRenderedRange().end
      const total = this.viewPort.getDataLength()

      if (end >= total - GridViewComponent.FETCH_MINIMUM && this.onScrollTriggered === false) {
        this.gitgubSearchService.setQueryPage(nextPage)
        this.onScrollTriggered = true;
        setTimeout(() => {
          this.onScrollTriggered = false;
        }, 1000)
      }
    }
  }
}


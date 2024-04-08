import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
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
  private readonly SM_SIZE_GRID = 20
  private readonly MD_SIZE_GRID = 30
  private readonly LG_SIZE_GRID = 40

  private readonly SM_SIZE_CARD = 80
  private readonly MD_SIZE_CARD = 90
   LG_SIZE_CARD = 100

   query$: Observable<IGithubQuery>

  protected resizeObservable$?: Observable<Event>

  protected resizeSubscription$?: Subscription;

  private viewPortSize: ViewPortSize = ViewPortSize.LG

  public itemSize = this.LG_SIZE_GRID
  onScrollTriggered: boolean = false;
  isGridView: boolean = true;

  public constructor(
    private readonly gitgubSearchService: GitgubSearchService
  ) {
    this.query$ = this.gitgubSearchService.getQuery();
  }

  public ngOnInit(): void {
    this.gitgubSearchService.getSelectedView()
    .subscribe({
      next: (isGrid) => {
        this.isGridView = isGrid;
        if (!this.isGridView) {
          this.itemSize = this.LG_SIZE_CARD
        } else {
          this.itemSize = this.LG_SIZE_GRID
        }
        this.getItemSize();
      }
    })
    this.getItemSize()
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.getItemSize()
      })
  }

  public getItemSize() {
    if (
      window.innerWidth < BreakPoint.MD &&
      this.viewPortSize !== ViewPortSize.MD
    ) {
      this.itemSize = this.isGridView ? this.MD_SIZE_GRID : this.MD_SIZE_CARD;
      this.viewPortSize = ViewPortSize.MD
      this.viewPort?.checkViewportSize()
    } else if (
      window.innerHeight < BreakPoint.SM &&
      this.viewPortSize !== ViewPortSize.SM
    ) {
      this.itemSize = this.isGridView ? this.SM_SIZE_GRID : this.SM_SIZE_CARD;
      this.viewPortSize = ViewPortSize.SM
      this.viewPort?.checkViewportSize()
    } else if (
      window.innerWidth > BreakPoint.MD &&
      this.viewPortSize !== ViewPortSize.LG
    ) {
      this.itemSize = this.isGridView ? this.LG_SIZE_GRID : this.LG_SIZE_CARD;
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

import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {BehaviorSubject, combineLatest, map, Observable, of} from 'rxjs'
import {catchError, mergeMap, scan, switchMap} from 'rxjs/operators'
import { DefaultFilterValue, GithubRepo, GithubRequestParameters, IGithubQuery, IGithubRequestOptions, IGithubResult, ILanguage } from 'src/app/Models/github-search.model'


@Injectable({
  providedIn: 'root'
})
export class GitgubSearchService {
  private static readonly API_BASE = 'https://api.github.com/'
  private static readonly MAX_CONTENT_FETCH = 50
  private static readonly DEFAULT_PAGE = '1'
  private static readonly SORT_ORDER = 'desc'
  private static readonly DEFAULT_LANGUAGE = 'javascript'
  private static readonly IS_GRID_VIEW = true;

  private readonly _isGridView$ = new BehaviorSubject(
    GitgubSearchService.IS_GRID_VIEW
  )

  private readonly _language$ = new BehaviorSubject(
    GitgubSearchService.DEFAULT_LANGUAGE
  )

  private readonly _sortOrder$ = new BehaviorSubject(
    GitgubSearchService.SORT_ORDER
  )

  private readonly _pageNumber$ = new BehaviorSubject(
    GitgubSearchService.DEFAULT_PAGE
  )
  currentPage: string = '1';

  public getSelectedView(): Observable<boolean> {
    return this._isGridView$.asObservable();
  }

  public getLanguage(): Observable<string> {
    return this._language$.asObservable()
  }

  public getSortOrder(): Observable<string> {
    return this._sortOrder$.asObservable()
  }

  public getPageNumber(): Observable<string> {
    return this._pageNumber$.asObservable()
  }

  private readonly _query$: Observable<IGithubQuery>

  public constructor(private readonly http: HttpClient) {
    this._query$ = combineLatest([
      this.getLanguage(),
      this.getSortOrder()
    ]).pipe(
      switchMap(([lang, sortOrder]) =>
        this.getPageNumber().pipe(
          mergeMap(page =>
            this.getQueryContent({
              lang,
              sortOrder,
              page
            }).pipe(
              catchError(() => {
                return of([])
              })
            )
          ),
          scan(
            (acc, curr) => ({
              results: curr.length ? acc.results.concat(curr) : acc.results,
              nextPage: (Number(this.currentPage) + 1).toString()
            }),
            {
              results: [] as GithubRepo[],
              nextPage: undefined
            } as IGithubQuery
          )
        )
      )
    )
  }

  public setQueryPage(page: string): void {
    this._pageNumber$.next(page);
    this.currentPage = page;
  }

  public setSortOrder(order: string): void {
    this._sortOrder$.next(order);
    this.setQueryPage(GitgubSearchService.DEFAULT_PAGE)
  }

  public setLanguage(lang: string): void {
    this._language$.next(lang);
    this.setQueryPage(GitgubSearchService.DEFAULT_PAGE)
  }

  public setView(isGrid: boolean): void {
    this._isGridView$.next(isGrid);
    // this.setQueryPage(GitgubSearchService.DEFAULT_PAGE)
  }


  public getQuery(): Observable<IGithubQuery> {
    return this._query$
  }

  private getQueryContent({
    lang,
    page,
    sortOrder
  }: IGithubRequestOptions): Observable<GithubRepo[]> {
    const path = new URL(`${GitgubSearchService.API_BASE}` + 'search/repositories');

    path.searchParams.append(GithubRequestParameters.LANG, DefaultFilterValue.LANG_PREFIX + lang);
    path.searchParams.append(GithubRequestParameters.SORT, DefaultFilterValue.SORT )
    path.searchParams.append(GithubRequestParameters.ORDER, sortOrder)
    path.searchParams.append(GithubRequestParameters.PAGE, page)
    path.searchParams.append(
      GithubRequestParameters.LIMIT,
      GitgubSearchService.MAX_CONTENT_FETCH.toString()
    )

    return this.http.get<IGithubResult>(path.toString()).pipe(
      map(result => result.items)
    )
  }

  getAllLanguages() {
    const path = GitgubSearchService.API_BASE + 'languages';
    return this.http.get<ILanguage[]>(path).pipe(
      map(result => result)
    )
  }
}


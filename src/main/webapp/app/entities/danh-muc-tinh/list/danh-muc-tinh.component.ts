import { Component, NgZone, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { Observable, Subscription, combineLatest, filter, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortByDirective, SortDirective, SortService, type SortState, sortStateSignal } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { DEFAULT_SORT_DATA, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { IDanhMucTinh } from '../danh-muc-tinh.model';
import { DanhMucTinhService, EntityArrayResponseType } from '../service/danh-muc-tinh.service';
import { DanhMucTinhDeleteDialogComponent } from '../delete/danh-muc-tinh-delete-dialog.component';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-tinh',
  templateUrl: './danh-muc-tinh.component.html',
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    SortDirective,
    SortByDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
  ],
})
export class DanhMucTinhComponent implements OnInit {
  subscription: Subscription | null = null;
  danhMucTinhs?: IDanhMucTinh[];
  isLoading = false;

  sortState = sortStateSignal({});

  public router = inject(Router);
  protected danhMucTinhService = inject(DanhMucTinhService);
  protected activatedRoute = inject(ActivatedRoute);
  protected sortService = inject(SortService);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackMaTinh = (_index: number, item: IDanhMucTinh): string => this.danhMucTinhService.getDanhMucTinhIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => {
          if (!this.danhMucTinhs || this.danhMucTinhs.length === 0) {
            this.load();
          }
        }),
      )
      .subscribe();
  }

  delete(danhMucTinh: IDanhMucTinh): void {
    const modalRef = this.modalService.open(DanhMucTinhDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.danhMucTinh = danhMucTinh;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }

  load(): void {
    this.queryBackend().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(event: SortState): void {
    this.handleNavigation(event);
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.danhMucTinhs = this.refineData(dataFromBody);
  }

  protected refineData(data: IDanhMucTinh[]): IDanhMucTinh[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: IDanhMucTinh[] | null): IDanhMucTinh[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.danhMucTinhService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(sortState: SortState): void {
    const queryParamsObj = {
      sort: this.sortService.buildSortParam(sortState),
    };

    this.ngZone.run(() => {
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute,
        queryParams: queryParamsObj,
      });
    });
  }
}

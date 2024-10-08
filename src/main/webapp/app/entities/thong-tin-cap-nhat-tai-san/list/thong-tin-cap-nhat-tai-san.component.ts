import { Component, NgZone, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { Observable, Subscription, combineLatest, filter, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortByDirective, SortDirective, SortService, type SortState, sortStateSignal } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { DEFAULT_SORT_DATA, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { DataUtils } from 'app/core/util/data-util.service';
import { IThongTinCapNhatTaiSan } from '../thong-tin-cap-nhat-tai-san.model';
import { EntityArrayResponseType, ThongTinCapNhatTaiSanService } from '../service/thong-tin-cap-nhat-tai-san.service';
import { ThongTinCapNhatTaiSanDeleteDialogComponent } from '../delete/thong-tin-cap-nhat-tai-san-delete-dialog.component';

@Component({
  standalone: true,
  selector: 'jhi-thong-tin-cap-nhat-tai-san',
  templateUrl: './thong-tin-cap-nhat-tai-san.component.html',
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
export class ThongTinCapNhatTaiSanComponent implements OnInit {
  subscription: Subscription | null = null;
  thongTinCapNhatTaiSans?: IThongTinCapNhatTaiSan[];
  isLoading = false;

  sortState = sortStateSignal({});

  public router = inject(Router);
  protected thongTinCapNhatTaiSanService = inject(ThongTinCapNhatTaiSanService);
  protected activatedRoute = inject(ActivatedRoute);
  protected sortService = inject(SortService);
  protected dataUtils = inject(DataUtils);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackIdCapNhat = (_index: number, item: IThongTinCapNhatTaiSan): number =>
    this.thongTinCapNhatTaiSanService.getThongTinCapNhatTaiSanIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => this.load()),
      )
      .subscribe();
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(thongTinCapNhatTaiSan: IThongTinCapNhatTaiSan): void {
    const modalRef = this.modalService.open(ThongTinCapNhatTaiSanDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.thongTinCapNhatTaiSan = thongTinCapNhatTaiSan;
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
    this.thongTinCapNhatTaiSans = this.refineData(dataFromBody);
  }

  protected refineData(data: IThongTinCapNhatTaiSan[]): IThongTinCapNhatTaiSan[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: IThongTinCapNhatTaiSan[] | null): IThongTinCapNhatTaiSan[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.thongTinCapNhatTaiSanService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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

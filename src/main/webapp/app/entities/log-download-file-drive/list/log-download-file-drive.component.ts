import { Component, NgZone, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, Observable, Subscription, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { sortStateSignal, SortDirective, SortByDirective, type SortState, SortService } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { ILogDownloadFileDrive } from '../log-download-file-drive.model';
import { EntityArrayResponseType, LogDownloadFileDriveService } from '../service/log-download-file-drive.service';
import { LogDownloadFileDriveDeleteDialogComponent } from '../delete/log-download-file-drive-delete-dialog.component';

@Component({
  standalone: true,
  selector: 'jhi-log-download-file-drive',
  templateUrl: './log-download-file-drive.component.html',
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
export class LogDownloadFileDriveComponent implements OnInit {
  subscription: Subscription | null = null;
  logDownloadFileDrives?: ILogDownloadFileDrive[];
  isLoading = false;

  sortState = sortStateSignal({});

  public router = inject(Router);
  protected logDownloadFileDriveService = inject(LogDownloadFileDriveService);
  protected activatedRoute = inject(ActivatedRoute);
  protected sortService = inject(SortService);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackId = (_index: number, item: ILogDownloadFileDrive): number =>
    this.logDownloadFileDriveService.getLogDownloadFileDriveIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => {
          if (!this.logDownloadFileDrives || this.logDownloadFileDrives.length === 0) {
            this.load();
          }
        }),
      )
      .subscribe();
  }

  delete(logDownloadFileDrive: ILogDownloadFileDrive): void {
    const modalRef = this.modalService.open(LogDownloadFileDriveDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.logDownloadFileDrive = logDownloadFileDrive;
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
    this.logDownloadFileDrives = this.refineData(dataFromBody);
  }

  protected refineData(data: ILogDownloadFileDrive[]): ILogDownloadFileDrive[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: ILogDownloadFileDrive[] | null): ILogDownloadFileDrive[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.logDownloadFileDriveService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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

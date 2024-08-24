import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';
import { ThongTinChungHopDongService } from '../service/thong-tin-chung-hop-dong.service';
import { ThongTinChungHopDongFormService, ThongTinChungHopDongFormGroup } from './thong-tin-chung-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-thong-tin-chung-hop-dong-update',
  templateUrl: './thong-tin-chung-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ThongTinChungHopDongUpdateComponent implements OnInit {
  isSaving = false;
  thongTinChungHopDong: IThongTinChungHopDong | null = null;

  protected thongTinChungHopDongService = inject(ThongTinChungHopDongService);
  protected thongTinChungHopDongFormService = inject(ThongTinChungHopDongFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ThongTinChungHopDongFormGroup = this.thongTinChungHopDongFormService.createThongTinChungHopDongFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thongTinChungHopDong }) => {
      this.thongTinChungHopDong = thongTinChungHopDong;
      if (thongTinChungHopDong) {
        this.updateForm(thongTinChungHopDong);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const thongTinChungHopDong = this.thongTinChungHopDongFormService.getThongTinChungHopDong(this.editForm);
    if (thongTinChungHopDong.id !== null) {
      this.subscribeToSaveResponse(this.thongTinChungHopDongService.update(thongTinChungHopDong));
    } else {
      this.subscribeToSaveResponse(this.thongTinChungHopDongService.create(thongTinChungHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThongTinChungHopDong>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(thongTinChungHopDong: IThongTinChungHopDong): void {
    this.thongTinChungHopDong = thongTinChungHopDong;
    this.thongTinChungHopDongFormService.resetForm(this.editForm, thongTinChungHopDong);
  }
}

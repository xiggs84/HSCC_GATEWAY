import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { DanhSachHopDongService } from '../service/danh-sach-hop-dong.service';
import { DanhSachHopDongFormService, DanhSachHopDongFormGroup } from './danh-sach-hop-dong-form.service';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-hop-dong-update',
  templateUrl: './danh-sach-hop-dong-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DanhSachHopDongUpdateComponent implements OnInit {
  isSaving = false;
  danhSachHopDong: IDanhSachHopDong | null = null;

  protected danhSachHopDongService = inject(DanhSachHopDongService);
  protected danhSachHopDongFormService = inject(DanhSachHopDongFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DanhSachHopDongFormGroup = this.danhSachHopDongFormService.createDanhSachHopDongFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ danhSachHopDong }) => {
      this.danhSachHopDong = danhSachHopDong;
      if (danhSachHopDong) {
        this.updateForm(danhSachHopDong);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const danhSachHopDong = this.danhSachHopDongFormService.getDanhSachHopDong(this.editForm);
    if (danhSachHopDong.id !== null) {
      this.subscribeToSaveResponse(this.danhSachHopDongService.update(danhSachHopDong));
    } else {
      this.subscribeToSaveResponse(this.danhSachHopDongService.create(danhSachHopDong));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDanhSachHopDong>>): void {
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

  protected updateForm(danhSachHopDong: IDanhSachHopDong): void {
    this.danhSachHopDong = danhSachHopDong;
    this.danhSachHopDongFormService.resetForm(this.editForm, danhSachHopDong);
  }
}

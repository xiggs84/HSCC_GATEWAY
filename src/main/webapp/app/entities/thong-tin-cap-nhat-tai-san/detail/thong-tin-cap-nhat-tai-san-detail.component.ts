import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { DataUtils } from 'app/core/util/data-util.service';
import { IThongTinCapNhatTaiSan } from '../thong-tin-cap-nhat-tai-san.model';

@Component({
  standalone: true,
  selector: 'jhi-thong-tin-cap-nhat-tai-san-detail',
  templateUrl: './thong-tin-cap-nhat-tai-san-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ThongTinCapNhatTaiSanDetailComponent {
  thongTinCapNhatTaiSan = input<IThongTinCapNhatTaiSan | null>(null);

  protected dataUtils = inject(DataUtils);

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICauHinhMauChungThuc } from '../cau-hinh-mau-chung-thuc.model';
import { CauHinhMauChungThucService } from '../service/cau-hinh-mau-chung-thuc.service';

@Component({
  standalone: true,
  templateUrl: './cau-hinh-mau-chung-thuc-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CauHinhMauChungThucDeleteDialogComponent {
  cauHinhMauChungThuc?: ICauHinhMauChungThuc;

  protected cauHinhMauChungThucService = inject(CauHinhMauChungThucService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cauHinhMauChungThucService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

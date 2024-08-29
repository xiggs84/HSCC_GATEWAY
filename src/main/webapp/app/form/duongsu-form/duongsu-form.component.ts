import { Component } from '@angular/core';
import SharedModule from '../../shared/shared.module';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
@Component({
  selector: 'jhi-duongsu-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './duongsu-form.component.html',
  styleUrl: './duongsu-form.component.scss'
})
export class DuongsuFormComponent {
  isVisible = false;
  duongSuForm: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalService) {
    this.duongSuForm = this.fb.group({
      loaiDuongSu: [null],
      hoTen: [null]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Form Data: ', this.duongSuForm.value);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

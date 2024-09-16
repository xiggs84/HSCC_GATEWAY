import {Component, OnInit} from '@angular/core';
import SharedModule from '../../shared/shared.module';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'jhi-taisan-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './taisan-form.component.html',
  styleUrl: './taisan-form.component.scss'
})
export class TaisanFormComponent {
  isVisible = false;
  taiSanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taiSanForm = this.fb.group({
      loaiTaiSan: [null],
      tenPhieuTaiSan: [null],
      diaChiNha: [null],
      tongDienTichSuDung: [null],
      dienTichSan: [null],
      ketCau: [null],
      soTang: [null],
      thuaDatSo: [null],
      toBanDoSo: [null],
      loaiDat: [null],
      hangDat: [null],
      thoiHanSD: [null],
      hinhThucSuDungChung: [null],
      hinhThucSuDungRieng: [null],
      mucDichSuDungDat: [null],
      nguonGocThuaDat: [null],
      ghiChu: [null],
      soHuuTheo: [null]
    });
  }

  ngOnInit(): void {
    this.taiSanForm = this.fb.group({
      loaiTaiSan: [null],
      tenPhieuTaiSan: [null],
      diaChiNha: [null],
      tongDienTichSuDung: [null],
      dienTichSan: [null],
      ketCau: [null],
      soTang: [null],
      thuaDatSo: [null],
      toBanDoSo: [null],
      loaiDat: [null],
      hangDat: [null],
      thoiHanSD: [null],
      hinhThucSuDungChung: [null],
      hinhThucSuDungRieng: [null],
      mucDichSuDungDat: [null],
      nguonGocThuaDat: [null],
      ghiChu: [null],
      soHuuTheo: [null]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Form Data: ', this.taiSanForm.value);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

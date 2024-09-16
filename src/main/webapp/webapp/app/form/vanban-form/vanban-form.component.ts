import {Component, OnInit} from '@angular/core';
import SharedModule from '../../shared/shared.module';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'jhi-vanban-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './vanban-form.component.html',
  styleUrl: './vanban-form.component.scss'
})
export class VanbanFormComponent {
  isVisible = false;
  vanBanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.vanBanForm = this.fb.group({
      loaiVanBan: [null],
      dienGiai: ['']
    });
  }

  ngOnInit(): void {
    this.vanBanForm = this.fb.group({
      loaiVanBan: [null],
      dienGiai: ['']
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Form Data: ', this.vanBanForm.value);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  choseFile(): void {
    // Logic to open a file picker or handle file selection
    console.log('Chọn tập tin button clicked!');
  }
}

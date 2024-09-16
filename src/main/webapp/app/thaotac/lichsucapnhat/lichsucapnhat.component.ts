import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";

@Component({
  selector: 'jhi-lichsucapnhat',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './lichsucapnhat.component.html',
  styleUrl: './lichsucapnhat.component.scss'
})
export class LichsucapnhatComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Output() nzOnCancel = new EventEmitter<unknown>();

  handleCancel(): void {
    this.isVisible = false;
    this.nzOnCancel.emit();
  }
}

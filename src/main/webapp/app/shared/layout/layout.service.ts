import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.collapsedSubject.asObservable();

  toggleCollapse() {
    this.collapsedSubject.next(!this.collapsedSubject.value);
  }

  setCollapse(value: boolean) {
    this.collapsedSubject.next(value);
  }
}

// counter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CounterService {
  // ❌ BehaviorSubject statt Signal – unnötig für einfachen synchronen Zustand
  private _count = new BehaviorSubject<number>(0);
  count$ = this._count.asObservable();

  increment() { this._count.next(this._count.value + 1); }
  reset() { this._count.next(0); }
}

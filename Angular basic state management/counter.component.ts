// counter.component.ts
import { Component, OnDestroy, signal } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count() }}</p>
      <p>Doppelt: {{ double() }}</p>
      <p>Status: {{ status() }}</p>
      <button (click)="increment()">+</button>
      <button (click)="reset()">Reset</button>
    </div>
  `
})
export class CounterComponent implements OnDestroy {
  // ❌ Zustand dupliziert – der Service hat bereits seinen eigenen Zustand
  count = signal(0);
  double = signal(0);
  status = signal('idle');

  private destroy$ = new Subject<void>();

  constructor(private counterService: CounterService) {
    // ❌ Manuelle Synchronisierung vom Service statt Signal direkt zu verwenden
    this.counterService.count$
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.count.set(val);
        // ❌ Manuelle Seiteneffekte statt computed()
        this.double.set(val * 2);
        this.status.set(val === 0 ? 'idle' : val > 10 ? 'high' : 'normal');
      });

    // ❌ Unnötiger Observable für einen einfachen lokalen Timer
    // verursacht kontinuierliche Change Detection
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.status.set(this.status());
      });
  }

  increment() {
    // ❌ Sowohl Service als auch lokales Signal werden manuell aktualisiert
    this.counterService.increment();
    this.count.update(v => v + 1);
  }

  reset() {
    this.counterService.reset();
    this.count.set(0);
    this.double.set(0);
    this.status.set('idle');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

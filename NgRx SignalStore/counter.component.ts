// counter.component.ts
import { Component, inject } from '@angular/core';
import { CounterStore } from './counter.store';

@Component({
  selector: 'app-counter',
  // Store ist lokal zum Komponenten – kein globaler Zustand nötig
  providers: [CounterStore],
  template: `
    <p>Count: {{ store.count() }}</p>
    <p>Doppelt: {{ store.double() }}</p>
    <p>Status: {{ store.status() }}</p>
    <button (click)="store.increment()">+</button>
    <button (click)="store.reset()">Reset</button>
  `,
})
export class CounterComponent {
  readonly store = inject(CounterStore);
}

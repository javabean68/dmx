// counter.store.ts
import { computed } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const CounterStore = signalStore(
  withState<CounterState>(initialState),

  withComputed(({ count }) => ({
    // Abgeleitete Werte – werden nie manuell gesetzt
    double: computed(() => count() * 2),
    status: computed(() => {
      const c = count();
      if (c === 0) return 'idle';
      if (c > 10)  return 'high';
      return 'normal';
    }),
  })),

  withMethods((store) => ({
    increment() {
      patchState(store, (s) => ({ count: s.count + 1 }));
    },
    reset() {
      patchState(store, initialState);
    },
  }))
);

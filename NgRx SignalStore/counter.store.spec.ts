// counter.store.spec.ts
import { TestBed } from '@angular/core/testing';
import { CounterStore } from './counter.store';

describe('CounterStore', () => {
  let store: InstanceType<typeof CounterStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CounterStore] });
    store = TestBed.inject(CounterStore);
  });

  it('Anfangszustand ist korrekt', () => {
    expect(store.count()).toBe(0);
    expect(store.double()).toBe(0);
    expect(store.status()).toBe('idle');
  });

  it('increment aktualisiert count und abgeleitete Werte', () => {
    store.increment();
    expect(store.count()).toBe(1);
    expect(store.double()).toBe(2);
    expect(store.status()).toBe('normal');
  });

  it('Status wird high ab 11', () => {
    for (let i = 0; i < 11; i++) store.increment();
    expect(store.status()).toBe('high');
  });

  it('reset setzt den Zustand auf den Anfangswert zurück', () => {
    store.increment();
    store.increment();
    store.reset();
    expect(store.count()).toBe(0);
    expect(store.status()).toBe('idle');
  });
});

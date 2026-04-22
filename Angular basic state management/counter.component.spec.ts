// counter.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { CounterService } from './counter.service';
import { BehaviorSubject } from 'rxjs';

describe('CounterComponent', () => {
  // ❌ Typescript Syntax ist schon hässlich aber bei Tests wird unertäglich :-(
  let component: CounterComponent;
  let mockService: { count$: BehaviorSubject<number>; increment: jest.Mock; reset: jest.Mock };

  beforeEach(() => {
    mockService = {
      // ❌ Der Test muss die interne Implementierung kennen (BehaviorSubject)
      count$: new BehaviorSubject(0),
      increment: jest.fn(),
      reset: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [CounterComponent],
      providers: [{ provide: CounterService, useValue: mockService }],
    });

    const fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Zustand wird vom Service synchronisiert', () => {
    // ❌ BehaviorSubject muss manuell emittieren um den Test auszulösen
    mockService.count$.next(5);
    expect(component.count()).toBe(5);
    // ❌ double und status müssen separat geprüft werden,
    // weil sie lokale Signals sind und nicht mit computed() abgeleitet werden
    expect(component.double()).toBe(10);
  });

  it('ruft Service bei increment auf und aktualisiert auch lokales Signal', () => {
    component.increment();
    expect(mockService.increment).toHaveBeenCalled();
    // ❌ Der Test prüft dupliziertes Verhalten:
    // der Komponente aktualisiert count() unabhängig vom Service
    expect(component.count()).toBe(1);
  });
});

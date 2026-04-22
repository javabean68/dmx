// CounterViewModelTest.kt
import app.cash.turbine.test
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Test

//  Die Tests sind einfach definierbar eund verständlich ohne Jasmine Müll :D
//  Turbine + `runTest` ist wirklich eine andere Welt verglichen mit dem ganzen `TestBed.configureTestingModule`,
//  `fixture.detectChanges()`, `BehaviorSubject`-Mock-Gefrickel von Angular/Jasmine.
//
//Der Kotlin-Test liest sich fast wie Prosa, der Angular-Test wie Boilerplate-Archäologie. 😄
class CounterViewModelTest {

    private val viewModel = CounterViewModel()

    @Test
    fun `Anfangszustand ist korrekt`() = runTest {
        val state = viewModel.uiState.value
        assertEquals(0,      state.count)
        assertEquals(0,      state.double)
        assertEquals("idle", state.status)
    }

    @Test
    fun `increment aktualisiert count und abgeleitete Werte atomar`() = runTest {
        viewModel.uiState.test {
            awaitItem() // Anfangszustand überspringen

            viewModel.increment()
            val state = awaitItem()

            // Alle Werte aus einer einzigen konsistenten Emission geprüft
            assertEquals(1,        state.count)
            assertEquals(2,        state.double)
            assertEquals("normal", state.status)
        }
    }

    @Test
    fun `Status wird high ab 11`() = runTest {
        repeat(11) { viewModel.increment() }
        assertEquals("high", viewModel.uiState.value.status)
    }

    @Test
    fun `reset setzt den Zustand auf den Anfangswert zurück`() = runTest {
        repeat(5) { viewModel.increment() }
        viewModel.reset()
        assertEquals(CounterUiState(), viewModel.uiState.value)
    }
}
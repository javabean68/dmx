// CounterViewModel.kt
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

// Unveränderlicher Zustand – einzige Wahrheitsquelle
data class CounterUiState(
    val count: Int = 0,
) {
    // Abgeleitete Werte als berechnete Eigenschaften, nicht separat gespeichert
    val double: Int get() = count * 2
    val status: String get() = when {
        count == 0  -> "idle"
        count > 10  -> "high"
        else        -> "normal"
    }
}

class CounterViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(CounterUiState())
    // Nur lesbar nach außen - UDF - Immutable Objekte.
    val uiState: StateFlow<CounterUiState> = _uiState.asStateFlow()

    fun increment() = _uiState.update { it.copy(count = it.count + 1) }
    fun reset()     = _uiState.update { CounterUiState() }
}
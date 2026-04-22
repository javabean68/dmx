// CounterScreen.kt
import androidx.compose.runtime.*
import androidx.compose.material3.*
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    // Einzige Subscription – keine manuelle Synchronisierung nötig
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    Column {
        Text("Count: ${state.count}")
        Text("Doppelt: ${state.double}")
        Text("Status: ${state.status}")
        Button(onClick = viewModel::increment) { Text("+") }
        Button(onClick = viewModel::reset)     { Text("Reset") }
    }
}
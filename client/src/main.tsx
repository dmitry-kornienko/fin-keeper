import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './app/store.ts'
import { Auth } from './features/auth/Auth.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<Auth>
				<App />
			</Auth>
		</Provider>
	</StrictMode>
)

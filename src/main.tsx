import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.scss'
import { Provider } from 'react-redux'
import store from './redux/configureStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)

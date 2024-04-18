import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // The React.StrictMode renders components twice which is not ideal in our scenario
  // but may be used later on
  //<React.StrictMode>
  <>
    <App />
  </>
  //</React.StrictMode>,
)

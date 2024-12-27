import Calculator from './components/Calculator';
import { SessionManager } from 'react-together';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Calculator />
      <div className="fixed bottom-2 right-2">
        <SessionManager />
      </div>
    </div>
  );
}

export default App;
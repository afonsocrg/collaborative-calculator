import Calculator from "./components/Calculator";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Header />
          <Calculator />
        </div>
      </div>
    </div>
  );
}

export default App;

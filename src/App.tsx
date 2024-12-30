import Calculator from "./components/Calculator";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <Layout>
        <Header />
        <Calculator />
      </Layout>
    </SettingsProvider>
  );
}

export default App;

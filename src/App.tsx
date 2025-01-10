import Calculator from "./components/Calculator";
import { Chat } from "./components/Chat/Chat";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <Layout>
        <Header />
        <Calculator />
        <Chat />
      </Layout>
    </SettingsProvider>
  );
}

export default App;

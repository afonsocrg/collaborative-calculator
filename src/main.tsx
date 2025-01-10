import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactTogether } from "react-together";
import App from "./App.tsx";
import "./index.css";

const USER_ID_KEY = "userId";

let userId = localStorage.getItem(USER_ID_KEY);
if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem(USER_ID_KEY, userId);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactTogether
      sessionParams={{
        appId: import.meta.env["VITE_APP_ID"],
        apiKey: import.meta.env["VITE_API_KEY"],
      }}
      userId={userId}
    >
      <App />
    </ReactTogether>
  </StrictMode>
);

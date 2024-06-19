import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./utils/apollo.ts";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/zh-CN";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={enUS}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ConfigProvider>
);

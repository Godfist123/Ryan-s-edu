import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./containers/Login/index";
import Home from "./containers/Home/index";
import Page404 from "./containers/404/Page404";
import { client } from "./utils/apollo";
import { StoreProvider } from "./utils/context/StoreProvider";
import Test from "./containers/Test";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </ApolloProvider>
);

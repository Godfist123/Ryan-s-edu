import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/index";
import Page404 from "./containers/404/Page404";
import { client } from "./utils/apollo";
import { UserProvider } from "./utils/context/UserContext";
import LoginWithUser from "./containers/Login/index";
import TestWithUser from "./containers/Test";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWithUser />} />
          <Route path="/test" element={<TestWithUser />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </ApolloProvider>
);

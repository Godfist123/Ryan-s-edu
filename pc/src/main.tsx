import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page404 from "./containers/404/Page404";
import { client } from "./utils/apollo";
import { UserProvider } from "./utils/context/UserContext";
import LoginWithUser from "./containers/Login/index";
import Layout from "./components/Layout/index";
import { routes } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginWithUser />} />
          <Route path="/" element={<Layout />}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </ApolloProvider>
);

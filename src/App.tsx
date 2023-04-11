import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentLayout from "./components/layouts/ContentLayout/ContentLayout";
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import ConnectionsScreen from "./features/dashboard/screens/ConnectionsScreen/ConnectionsScreen";
import CreateConnectionScreen from "./features/dashboard/screens/CreateConnectionScreen/CreateConnectionScreen";
import CredentialDefinitionScreen from "./features/dashboard/screens/CredentialDefinitionScreen/CredentialDefinitionScreen";
import CredentialSchemasScreen from "./features/dashboard/screens/CredentialSchemaScreen/CredentialSchemaScreen";
import HomeScreen from "./features/dashboard/screens/HomeScreen/HomeScreen";
import IssueCredentialScreen from "./features/dashboard/screens/IssueCredentialScreen/IssueCredentialScreen";
import LoginScreen from "./features/login/screens/LoginScreen/LoginScreen";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/login" element={<DefaultLayout />}>
              <Route path="/login" element={<LoginScreen />} />
            </Route>
            <Route path="/" element={<ContentLayout />}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/connections" element={<ConnectionsScreen />} />
              <Route
                path="/connections/create"
                element={<CreateConnectionScreen />}
              />
              <Route
                path="/credential-schemas"
                element={<CredentialSchemasScreen />}
              />
              <Route
                path="/credential-definitions"
                element={<CredentialDefinitionScreen />}
              />
              <Route
                path="/issue-credentials"
                element={<IssueCredentialScreen />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

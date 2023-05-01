import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentLayout from "./components/layouts/ContentLayout/ContentLayout";
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import ConnectionsScreen from "./features/dashboard/screens/ConnectionsScreen/ConnectionsScreen";
import CreateConnectionScreen from "./features/dashboard/screens/CreateConnectionScreen/CreateConnectionScreen";
import CredentialDefinitionScreen from "./features/dashboard/screens/CredentialDefinitionScreen/CredentialDefinitionScreen";
import CredentialSchemasScreen from "./features/dashboard/screens/CredentialSchemaScreen/CredentialSchemaScreen";
import HomeScreen from "./features/dashboard/screens/HomeScreen/HomeScreen";
import IssueCredentialScreen from "./features/dashboard/screens/IssueCredentialScreen/IssueCredentialScreen";
import IssuedCredentialsScreen from "./features/dashboard/screens/IssuedCredentialsScreen/IssuedCredentialsScreen";
import LoginScreen from "./features/login/screens/LoginScreen/LoginScreen";
import ConnectScreen from "./features/public/screens/ConnectScreen/ConnectScreen";

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
            <Route path="/connect" element={<DefaultLayout />}>
              <Route path="/connect" element={<ConnectScreen />} />
            </Route>
            <Route path="/" element={<ContentLayout />}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/connections" element={<ConnectionsScreen />} />
              <Route
                path="/connections/create"
                element={<CreateConnectionScreen isPublic={false} />}
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
                path="/issue-credential"
                element={<IssueCredentialScreen />}
              />
              <Route
                path="/issue-credentials"
                element={<IssuedCredentialsScreen />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentLayout from "./components/layouts/ContentLayout/ContentLayout";
import ConnectionsScreen from "./features/screens/ConnectionsScreen/ConnectionsScreen";
import CreateConnectionScreen from "./features/screens/CreateConnectionScreen/CreateConnectionsScreen";
import CredentialSchemasScreen from "./features/screens/CredentialSchemasScreen/CredentialSchemasScreen";
import HomeScreen from "./features/screens/HomeScreen/HomeScreen";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app">
          <ContentLayout>
            <Routes>
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
            </Routes>
          </ContentLayout>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

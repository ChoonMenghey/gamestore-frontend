import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "./pages/dashboard";
import { Gamepad2, Home } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import GamesList from "./pages/games/list";
import GamesCreate from "./pages/games/create";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "POrDWp-N8gMbN-zBARIO",
              }}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: { label: "Home", icon: <Home /> },
                },
                {
                  name: "games",
                  list: "/games",
                  create: "/games/create",
                  meta: { label: "Games", icon: <Gamepad2 /> },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="games">
                    <Route index element={<GamesList />} />
                    <Route path="create" element={<GamesCreate />} />
                  </Route>
                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

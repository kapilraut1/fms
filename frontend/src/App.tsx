import { BrowserRouter as Router } from "react-router";
import { AppRoutes } from "./routes/index";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="flex min-h-svh flex-col">
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppRoutes />
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;

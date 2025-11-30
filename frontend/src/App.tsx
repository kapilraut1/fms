import { BrowserRouter as Router } from "react-router";
import { AppRoutes } from "./routes/index";
function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;

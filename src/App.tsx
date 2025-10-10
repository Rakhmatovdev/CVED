import { NuqsAdapter } from "nuqs/adapters/react";
import { QueryProvider } from "./app/providers/query.provider";
import Routes from "./routes";

function App() {
  return (
    <QueryProvider>
      <NuqsAdapter>
        <Routes />
      </NuqsAdapter>
    </QueryProvider>
  );
}

export default App;

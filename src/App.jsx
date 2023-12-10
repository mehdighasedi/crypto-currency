import { Toaster } from "react-hot-toast";
import HomePage from "./Components/templates/HomePage";
import Layout from "./layout/Layout";

function App() {
  return (
    <Layout>
      <Toaster />
      <HomePage />
    </Layout>
  );
}

export default App;

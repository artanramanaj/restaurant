import { Outlet } from "react-router-dom";
import { Header, TopBar } from "@/components/index";
function App() {
  return (
    <>
      <main>
        <TopBar />
        <Header />
        <Outlet />
      </main>
    </>
  );
}

export default App;

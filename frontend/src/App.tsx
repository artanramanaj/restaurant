import { Outlet } from "react-router-dom";
import { Header, TopBar, Footer } from "@/components/index";
function App() {
  return (
    <>
      <main>
        <TopBar />
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default App;

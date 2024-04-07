import { Outlet } from "react-router-dom";
import MainNavigation from "./components/Layout/MainNavigation";

function App() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default App;

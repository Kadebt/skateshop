import Routes from "./routes";
import Footer from "./components/footer";
import Header from "./components/header";
import SideBar from "./components/sidebar";
import { useLocation } from "react-router-dom";

function App(props) {
  const location = useLocation();

  function FooterSideBar() {
    if (location.pathname === "/register" || location.pathname === "/login") {
      return null;
    } else if (location.pathname === "/cart" || location.pathname === "/") {
      return <Footer />;
    } else {
      return (
        <div>
          <Footer />
        </div>
      );
    }
  }

  return (
    <div>
      <Header />
      {Routes}
      <FooterSideBar />
    </div>
  );
}

export default App;

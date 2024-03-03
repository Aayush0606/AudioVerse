import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  return (
    <>
      <div className="bg-black flex flex-col h-screen justify-between overflow-hidden">
        <Header />
        <HomePage />
        <Footer />
      </div>
    </>
  );
}

export default App;

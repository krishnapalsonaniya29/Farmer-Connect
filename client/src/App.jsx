import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollProgress from "./components/ScrollProgress";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;

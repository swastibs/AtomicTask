import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./pages/Landing/Landing";

function App() {
  return (
    <ThemeProvider>
      <div className="relative isolate flex min-h-screen flex-col bg-background">
        <div
          className="app-grid pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
        />
        <Navbar />
        <main className="relative z-10 flex-1">
          <Landing />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

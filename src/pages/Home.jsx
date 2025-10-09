import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div id="home" className="bg-snowWhite min-h-screen">
      <Navbar />
      
        <div className="flex flex-col md:flex-row items-center justify-center text-center px-4 lg:gap-30">
            <div className="relative inline-block">
                <img 
                    src="src/assets/images/home-page-img.png" 
                    alt="Home Page Image" 
                    className="w-100 h-auto relative z-10"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,218,217,0.4)_0%,transparent_90%)] z-0"></div>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-4 mt-10 space-y-4">
                <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium italic text-roseWood">L’Art d’Être Belle</p>
                <p className="text-xl md:text-2xl lg:text-3xl font-heading font-medium italic text-smokyBlack">(The Art of Being Beautiful)</p>
                <p className="text-base md:text-lg lg:text-xl lg:text-left font-body font-medium text-smokyBlack my-8">Discover the subtle harmony of form, color, and self — personalized to you.</p>
                <a href="#analysis" className="bg-roseWood text-snowWhite px-6 py-3 rounded-lg text-lg font-heading font-medium hover:bg-smokyBlack mb-5">START ANALYSIS</a>
            </div>
        </div>

      <Footer />
    </div>
  );
}

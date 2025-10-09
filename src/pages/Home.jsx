import Navbar from "../components/NavBar";

export default function Home() {
  return (
    <div id="home" className="bg-snowWhite min-h-screen">
      <Navbar />
      
        <div className="flex flex-col items-center justify-center text-center px-4">
            <img src="src/assets/images/home-page-img.png" alt="Home Page Image" className="w-100 h-auto"/>
        </div>
      
    </div>
  );
}

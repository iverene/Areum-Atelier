export default function Footer() {
    return (
        <footer className="w-full bg-softPink text-smokyBlack font-heading text-left p-4 text-base md:text-lg lg:text-xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-left space-y-4 md:space-x-5">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-1">
                        <img src="src/assets/logo/logo.png" alt="logo" className="w-10 h-10"/>
                        <a href=""><img src="src/assets/logo/word-logo.png" alt="word logo" className="w-40 h-auto"/></a>
                    </div> 
                    <p className="italic">Your <span className="font-bold">areum</span>, artfully understood.</p>
                </div>

                <div className="flex flex-col justify-around md:flex-row md:space-x-20 lg:space-x-40">
                    <div className="mb-4 ">
                        <ul>
                            <a href=""><li className="hover:text-roseWood">About Areum Atelier</li></a>
                            <a href=""><li className="hover:text-roseWood">Our Philosophy</li></a>
                            <a href=""><li className="hover:text-roseWood">Privacy & Policy</li></a>
                            <a href=""><li className="hover:text-roseWood">Terms of Use</li></a>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-2 lg:space-y-3">
                        <p>Find beauty with us on...</p>
                        <div className="flex space-x-4">
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <i className="fa-brands fa-facebook text-taupeGray text-xl lg:text-2xl"></i>
                        </a>

                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <i className="fa-brands fa-instagram text-taupeGray text-xl lg:text-2xl"></i>
                        </a>

                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <i className="fa-brands fa-pinterest text-taupeGray text-xl lg:text-2xl"></i>
                        </a>
                        
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <i className="fa-brands fa-tiktok text-taupeGray text-xl lg:text-2xl"></i>
                        </a>
                        </div>
                    </div>
                </div>
                
            </div>
            <p className="text-sm md:text-base lg:text-lg text-center my-3 lg:mb-0">© 2025 Areum Atelier. All rights reserved. Crafted with grace and artistry.</p>
        </footer>
    );
}
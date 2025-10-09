export default function Navbar() {
    return (
        <nav className="w-full  bg-snowWhite text-smokyBlack font-heading font-bold flex items-center justify-between p-2 md:p-4 lg:px-5 sticky top-0 left-0 z-50">
            <div className="flex items-center space-x-4">
                <img src="src/assets/logo/logo.png" alt="logo" className="w-10 h-10"/>
                <a href=""><img src="src/assets/logo/word-logo.png" alt="word logo" className="w-40 h-8"/></a>
            </div>

            <div>
                <ul className="hidden md:flex gap-8 text-xl">
                    <li><a href="#analysis" className="hover:text-roseWood transition-colors">ANALYSIS</a></li>
                    <li><a href="#moodboard" className="hover:text-roseWood transition-colors">MOODBOARD</a></li>
                    <li><a href="#about" className="hover:text-roseWood transition-colors">ABOUT</a></li>
                </ul>
            </div>

            <div className="md:hidden cursor-pointer">
                <i className="fa-solid fa-bars text-2xl"></i>
            </div>

        </nav>
    );
}

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 10) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'text-roseWood' : 'text-smokyBlack';
    };

    return (
        <nav className={`w-full bg-snowWhite text-smokyBlack font-heading flex items-center justify-between p-2 md:p-4 lg:pl-5 lg:py-2 lg:pr-25 sticky top-0 left-0 z-50 transition-all duration-300 ${
            hasScrolled ? 'shadow-md' : 'shadow-none'
        }`}>
            <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="logo" className="w-10 h-10"/>
                <Link to="/">
                    <img src="/logo/word-logo.png" alt="word logo" className="w-40 h-auto"/>
                </Link>
            </div>

            <div>
                <ul className="hidden md:flex gap-30 text-xl">
                    <li>
                        <Link 
                            to="/analysis" 
                            className={`hover:text-roseWood transition-colors ${isActive('/analysis')}`}
                        >
                            ANALYSIS
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/moodboard" 
                            className={`hover:text-roseWood transition-colors ${isActive('/moodboard')}`}
                        >
                            MOODBOARD
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/about" 
                            className={`hover:text-roseWood transition-colors ${isActive('/about')}`}
                        >
                            ABOUT
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </div>

            <div className={`absolute top-full left-0 w-full bg-snowWhite md:hidden transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-100 visible shadow-lg' : 'opacity-0 invisible'
            }`}>
                <ul className="flex flex-col items-center py-4 space-y-4 text-lg">
                    <li>
                        <Link 
                            to="/analysis" 
                            className={`hover:text-roseWood transition-colors py-2 block ${isActive('/analysis')}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ANALYSIS
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/moodboard" 
                            className={`hover:text-roseWood transition-colors py-2 block ${isActive('/moodboard')}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            MOODBOARD
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/about" 
                            className={`hover:text-roseWood transition-colors py-2 block ${isActive('/about')}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ABOUT
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
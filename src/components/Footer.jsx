export default function Footer() {
    return (
        <footer className="w-full bg-softPink text-smokyBlack font-heading text-left p-4 text-base md:text-lg lg:text-xl">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-left space-y-4 md:space-x-5">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-1">
                        <img src="src/assets/logo/logo.png" alt="logo" className="w-10 h-10"/>
                        <a href=""><img src="src/assets/logo/word-logo.png" alt="word logo" className="w-40 h-auto"/></a>
                    </div> 
                    <p className="italic">Your <span className="font-bold">areum</span>, artfully understood.</p>
                </div>
                <p className="text-sm md:text-base lg:text-lg text-center my-3 lg:mb-0">© 2025 Areum Atelier. All rights reserved. <br/>Crafted with grace and artistry by Iverene Grace Causapin.</p>
            </div>
            
        </footer>
    );
}
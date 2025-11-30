import { useState, useEffect, useRef } from "react";
import Navbar from "../components/NavBar";

export default function Moodboard() {
    const [activeTab, setActiveTab] = useState("foryou");
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Refs to track click timing
    const clickTimeoutRef = useRef(null);
    const lastClickTimeRef = useRef(0);

    // Sample images with different aspect ratios for Pinterest style
    const sampleImages = [
        { id: 1, src: "/images/moodboard-1.jpg", alt: "Moodboard 1", saved: false, aspect: "tall" },
        { id: 2, src: "/images/moodboard-2.jpg", alt: "Moodboard 2", saved: false, aspect: "wide" },
        { id: 3, src: "/images/moodboard-3.jpg", alt: "Moodboard 3", saved: false, aspect: "tall" },
        { id: 4, src: "/images/moodboard-4.jpg", alt: "Moodboard 4", saved: false, aspect: "square" },
        { id: 5, src: "/images/moodboard-5.jpg", alt: "Moodboard 5", saved: false, aspect: "wide" },
        { id: 6, src: "/images/moodboard-6.jpg", alt: "Moodboard 6", saved: false, aspect: "tall" },
        { id: 7, src: "/images/moodboard-7.jpg", alt: "Moodboard 7", saved: false, aspect: "square" },
        { id: 8, src: "/images/moodboard-8.jpg", alt: "Moodboard 8", saved: false, aspect: "wide" },
        { id: 9, src: "/images/moodboard-9.jpg", alt: "Moodboard 9", saved: false, aspect: "tall" },
        { id: 10, src: "/images/moodboard-10.jpg", alt: "Moodboard 10", saved: false, aspect: "square" },
        { id: 11, src: "/images/moodboard-11.jpg", alt: "Moodboard 11", saved: false, aspect: "wide" },
        { id: 12, src: "/images/moodboard-12.jpg", alt: "Moodboard 12", saved: false, aspect: "tall" },
        { id: 13, src: "/images/moodboard-13.jpg", alt: "Moodboard 13", saved: false, aspect: "square" },
        { id: 14, src: "/images/moodboard-14.jpg", alt: "Moodboard 14", saved: false, aspect: "wide" },
        { id: 15, src: "/images/moodboard-15.jpg", alt: "Moodboard 15", saved: false, aspect: "tall" },
        { id: 16, src: "/images/moodboard-16.jpg", alt: "Moodboard 16", saved: false, aspect: "square" },
    ];

    // Aspect ratio classes for different image sizes
    const aspectClasses = {
        tall: "aspect-[3/4]",
        wide: "aspect-[4/3]",
        square: "aspect-square"
    };

    // Shuffle array function for random order
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Load saved images
    useEffect(() => {
    const saved = localStorage.getItem("moodboardImages");
    if (saved) {
        try {
        const parsed = JSON.parse(saved);
        setImages(parsed);
        return;
        } catch (err) {
        console.error("Invalid saved images in localStorage", err);
        }
    }

    const shuffled = shuffleArray(sampleImages);
    setImages(shuffled);
    }, []);

    // Save to localStorage 
    useEffect(() => {
    if (images.length > 0) {
        localStorage.setItem("moodboardImages", JSON.stringify(images));
    }
    }, [images]);



    // Filter images based on active tab
    const filteredImages = activeTab === "saved" 
        ? images.filter(img => img.saved)
        : images;

    // Toggle save state
    const toggleSave = (id) => {
        setImages(images.map(img => 
            img.id === id ? { ...img, saved: !img.saved } : img
        ));
        
        // Also update selected image if modal is open
        if (selectedImage && selectedImage.id === id) {
            setSelectedImage({ ...selectedImage, saved: !selectedImage.saved });
        }
    };

    // Handle image click with double click detection
    const handleImageClick = (image) => {
        const currentTime = new Date().getTime();
        const timeSinceLastClick = currentTime - lastClickTimeRef.current;

        // If clicks are within 300ms, consider it a double click
        if (timeSinceLastClick < 300) {
            // Double click detected - toggle save
            clearTimeout(clickTimeoutRef.current);
            toggleSave(image.id);
            
            // Show quick feedback animation
            const imageElement = document.getElementById(`image-${image.id}`);
            if (imageElement) {
                imageElement.classList.add('scale-105');
                setTimeout(() => {
                    imageElement.classList.remove('scale-105');
                }, 200);
            }
        } else {
            // Single click - set timeout to open modal
            clickTimeoutRef.current = setTimeout(() => {
                setSelectedImage(image);
                setIsModalOpen(true);
            }, 300);
        }

        lastClickTimeRef.current = currentTime;
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="bg-snowWhite min-h-screen">
            <Navbar />

            {/* Tabs */}
            <div className="flex justify-center mb-3">
                <div className="flex space-x-12 pb-2">
                    <button
                        className={`text-base md:text-lg lg:text-base font-body font-medium transition-colors ${
                            activeTab === "foryou" 
                                ? "text-roseWood border-b-2 border-roseWood" 
                                : "text-smokyBlack hover:text-roseWood"
                        }`}
                        onClick={() => setActiveTab("foryou")}
                    >
                        For you
                    </button>
                    <button
                        className={`text-base md:text-lg lg:text-base font-body font-medium transition-colors ${
                            activeTab === "saved" 
                                ? "text-roseWood border-b-2 border-roseWood" 
                                : "text-smokyBlack hover:text-roseWood"
                        }`}
                        onClick={() => setActiveTab("saved")}
                    >
                        Saved
                    </button>
                </div>
            </div>

            {/* Pinterest Grid */}
            <div className="container mx-auto px-4">
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                    {filteredImages.map((image) => (
                        <div 
                            key={image.id} 
                            id={`image-${image.id}`}
                            className="break-inside-avoid group relative cursor-pointer transition-transform duration-200"
                            onClick={() => handleImageClick(image)}
                        >
                            {/* Image Card */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                                <div className={aspectClasses[image.aspect]}>
                                    <img 
                                        src={image.src} 
                                        alt={image.alt}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                {/* Save Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSave(image.id);
                                    }}
                                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                                        image.saved 
                                            ? "bg-roseWood text-snowWhite scale-110" 
                                            : "bg-snowWhite/80 text-smokyBlack hover:bg-roseWood hover:text-snowWhite opacity-0 group-hover:opacity-100"
                                    }`}
                                >
                                    <i className={`fa-${image.saved ? "solid" : "regular"} fa-heart text-lg`}></i>
                                </button>
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end justify-center opacity-0 group-hover:opacity-100"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredImages.length === 0 && (
                    <div className="text-center py-16">
                        <i className="fa-regular fa-heart text-6xl text-gray-300 mb-4"></i>
                        <p className="text-xl font-body text-gray-500">No saved images yet</p>
                        <p className="text-gray-400 mt-2">Double click images or click the heart to save them</p>
                    </div>
                )}
            </div>

            {/* Modal for Image Preview */}
            {isModalOpen && selectedImage && (
                <div onClick={closeModal} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div onClick={(e) => e.stopPropagation()} className="bg-snowWhite rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
                        <div className="relative">
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 bg-black/50 text-snowWhite p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                                <i className="fa-solid fa-times text-xl"></i>
                            </button>

                            {/* Image */}
                            <img 
                                src={selectedImage.src} 
                                alt={selectedImage.alt}
                                className="w-full h-auto max-h-[70vh] object-contain"
                            />

                            {/* Save Button in Modal */}
                            <div className="absolute bottom-4 right-4">
                                <button
                                    onClick={() => toggleSave(selectedImage.id)}
                                    className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                        selectedImage.saved 
                                            ? "bg-roseWood text-snowWhite" 
                                            : "bg-snowWhite/90 text-smokyBlack hover:bg-roseWood hover:text-snowWhite"
                                    }`}
                                >
                                    <i className={`fa-${selectedImage.saved ? "solid" : "regular"} fa-heart text-2xl`}></i>
                                </button>
                            </div>
                        </div>

                        
                    </div>
                </div>
            )}
        </div>
    );
}
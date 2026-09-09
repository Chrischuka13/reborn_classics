import { Link } from "react-router";
import Collections from "../../components/Collections";

const Home = () => {
  return (
    <main>
        <section className="relative flex items-center justify-center w-full h-[85vh] min-h-125 md:min-h-175 overflow-hidden bg-gray-900">
        
            {/* Background Media Grid */}
            <div className="absolute inset-0 z-0">
                <picture className="w-full h-full">
                <source 
                    srcSet="https://res.cloudinary.com/dfvc3gvvl/image/upload/v1788288930/pexels-cottonbro-6626999.jpg" 
                    media="(min-width: 768px)" 
                />
                <img
                    src="https://res.cloudinary.com/dfvc3gvvl/image/upload/v1788288930/pexels-cottonbro-6626999.jpg"
                    alt="Man seated on a bench in a locker room wearing a sleeveless hoodie and sweatpants, holding a baseball bat."
                    className="object-cover w-full h-full"
                />
                </picture>
                {/* Gradient Overlay: crucial for making white text readable over images */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30"></div>
            </div>

        {/* Hero Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6 mx-auto text-center mt-14 md:mt-0">
                
                {/* Kicker / Eyebrow text */}
                <span className="mb-4 text-xs font-bold tracking-[0.2em] text-gray-300 uppercase md:text-sm drop-shadow-md">
                The All-Star Collection
                </span>

                {/* Main Headline */}
                <h1 className="max-w-4xl mb-6 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                Elevate Your  Game Day Style
                </h1>

                {/* Sub-headline */}
                <p className="max-w-2xl mb-10 text-base font-medium text-gray-200 drop-shadow sm:text-lg md:text-xl">
                Discover premium performance gear designed for athletes who demand the best on and off the field.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col items-center w-full gap-4 sm:w-auto sm:flex-row">
                <Link
                    to="/en-ng/collections/mlb-all-star"
                    className="flex items-center justify-center w-full px-10 py-4 text-sm font-bold tracking-widest text-black transition-all bg-white sm:w-auto hover:bg-gray-200 focus:ring-4 focus:ring-white/50"
                >
                    SHOP COLLECTION
                </Link>
                
                {/* Optional Secondary Button (Great for modern landing pages) */}
                <Link
                    to="/en-ng/collections/explore"
                    className="flex items-center justify-center w-full px-10 py-4 text-sm font-bold tracking-widest text-white transition-all bg-transparent border border-white sm:w-auto hover:bg-white/10 focus:ring-4 focus:ring-white/30"
                >
                    EXPLORE GALLERY
                </Link>
                </div>

            </div>
        </section>
        
        <section>
            <Collections/>
        </section>
    </main>

  );
};

export default Home;
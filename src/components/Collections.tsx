import { Link } from "react-router"

const Collections = () => {
  return (
    <div>
        <section className="w-full px-4 py-12 mx-auto max-w-7xl md:px-8">
            <h1 className="text-3xl text-center py-12">COLLECTIONS</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                
                {/* <!-- Men's Collection --> */}
                <div className="flex flex-col items-center group">
                    <Link to="/en-ng/collections/collection-9-mens" className="block w-full overflow-hidden aspect-3/4">
                        <img 
                        src="https://fearofgod.com/cdn/shop/files/LOOK_21.png?v=1774903859&width=1200" 
                        alt="Young person wearing oversized beige sweatshirt and loose pants" 
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                    </Link>
                    <div className="mt-6 text-center">
                        <Link  
                        to="/en-ng/collections/collection-9-mens" 
                        className="px-8 py-4 inline-block font-medium tracking-[0.2em] uppercase border-b border-transparent hover:border-black transition-colors duration-300 pb-1"
                        >
                        Shop Mens
                        </Link>
                    </div>
                </div>

                {/* <!-- Women's Collection --> */}
                <div className="flex flex-col items-center group">
                    <Link to="/en-ng/collections/collection-9-womens" className="block w-full overflow-hidden aspect-3/4">
                        <img 
                        src="https://fearofgod.com/cdn/shop/files/LOOK_22_4ceb154e-cb13-4a95-af80-d5946c19c68a.jpg?v=1758565251&width=1200" 
                        alt="Person wearing loose off-white jacket and wide matching pants" 
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                    </Link>
                    <div className="mt-6 text-center">
                        <Link 
                        to="/en-ng/collections/collection-9-womens" 
                        className="px-8 py-4 inline-block font-medium tracking-[0.2em] uppercase border-b border-transparent hover:border-black transition-colors duration-300 pb-1"
                        >
                        Shop Womens
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    </div>
  )
}

export default Collections
export default function ExplorePage() {
  return (
    <main className="px-4 py-16 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <p className="text-gray-600 mb-8">
        Discover our latest products and collections.
      </p>
      {/* Add your explore page content here */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          src="https://res.cloudinary.com/dfvc3gvvl/video/upload/v1788277599/4800577-hd_720_1280_24fps.mp4"
        />

        <video
          autoPlay
          loop
          muted
          playsInline
          src="https://res.cloudinary.com/dfvc3gvvl/video/upload/v1788277520/6616743-hd_720_1366_25fps.mp4"
        />

        <video
          autoPlay
          loop
          muted
          playsInline
          src="https://res.cloudinary.com/dfvc3gvvl/video/upload/v1788277833/6616746-hd_720_1366_25fps.mp4"
        /> */}
        
        <video
        controls
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        preload="metadata"
        poster="https://res.cloudinary.com/dfvc3gvvl/image/upload/v1787608442/A_high-end_fashion_studio_lookbook_photo_of_an_African_me_3.jpg"
        className="w-full h-auto rounded-lg shadow-sm"
        >
        <source
            src="https://res.cloudinary.com/dfvc3gvvl/video/upload/v1788277599/4800577-hd_720_1280_24fps.mp4"
            type="video/mp4"
        />
        Your browser does not support playing this video.
        </video>
      </div>
    </main>
  );
}

import React, { useEffect, useState } from 'react';

interface MediaItem {
  _id: string;
  url: string;
  publicId: string;
  resourceType: 'image' | 'video';
  createdAt: string;
}

export const MediaGallery: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/media');
        const result = await res.json();
        if (res.ok) {
          setMediaList(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (loading) return <p className="p-6 text-center text-gray-500">Loading gallery...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaList.map((item) => (
          <div key={item._id} className="overflow-hidden rounded-lg border bg-neutral-100 shadow-sm">
            {item.resourceType === 'video' ? (
              <video
                src={item.url}
                controls
                className="w-full h-64 object-cover"
                preload="metadata"
              />
            ) : (
              <img
                src={item.url}
                alt="Cloudinary media"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
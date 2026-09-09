import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
// import { auto } from "@cloudinary/url-gen/actions/quality";
// import { auto as autoFormat } from "@cloudinary/url-gen/actions/format";

const cld = new Cloudinary({
  cloud: {
    cloudName: "YOUR_CLOUD_NAME",
  },
});

export const ProductVideo = ({ publicId }: { publicId: string }) => {
  // Define video object & apply performance optimizations
  const myVideo = cld.video(publicId);
//   myVideo.quality(auto()).format(autoFormat());

  return (
    <div className="w-full max-w-xl">
      <AdvancedVideo
        cldVid={myVideo}
        controls
        playsInline
        className="w-full h-auto rounded-md"
      />
    </div>
  );
};
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React from "react";

type Props = {
  alt: string;
  src: string;
  width?: string;
  height?: string;
  className?: string;
  loading?: string;
  onContextMenu?: React.MouseEventHandler<HTMLImageElement>;
  onDragStart?: React.MouseEventHandler<HTMLImageElement>;
};

export default function LazyLoadImageRC({
  alt,
  src,
  width,
  height,
  className,
  loading,
  onContextMenu,
  onDragStart
}: Props) {
  return (
    <LazyLoadImage
      alt={alt}
      effect="blur"
      wrapperProps={{
        style: { transitionDelay: "1s" },
      }}
      src={src}
      width={width}
      height={height}
      className={className}
      loading={loading}
      // @ts-ignore - react-lazy-load-image-component types might not include all event handlers but the component passes them to the img tag
      onContextMenu={onContextMenu}
      onDragStart={onDragStart}
    />
  );
}
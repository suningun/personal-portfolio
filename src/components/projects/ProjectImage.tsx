"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export default function ProjectImage({ src, ...props }: ImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  return (
    <Image
      {...props}
      alt={props.alt}
      src={imageSrc}
      onError={() => setImageSrc("/images/projects/placeholder.webp")}
    />
  );
}

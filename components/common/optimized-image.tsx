'use client';

import Image from 'next/image';
import React, {useState} from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Calculate srcSet based on device sizes
  const generateSrcSet = () => {
    const widths = [640, 750, 828, 1080, 1200, 1920];
    return widths.map(w => `${src}?w=${w} ${w}w`).join(', ');
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={90}
        sizes={sizes}
        className={`
          transition-opacity duration-300
          ${loading ? 'opacity-0' : 'opacity-100'}
          ${error ? 'hidden' : 'block'}
        `}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        loading={priority ? 'eager' : 'lazy'}
      />

      {loading && !error && <div className='absolute inset-0 bg-gray-200 animate-pulse' />}

      {error && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
          <span className='text-gray-500'>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

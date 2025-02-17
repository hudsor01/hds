'use client'

import React, { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Box, Skeleton, IconButton, Typography, useTheme, alpha, type Theme, type SxProps } from '@mui/material'
import { Refresh as RefreshIcon, BrokenImage as BrokenImageIcon } from '@mui/icons-material'

type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
type LoadingBehavior = 'eager' | 'lazy'

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt' | 'onLoad' | 'onError'> {
  src: string
  alt: string
  blur?: boolean
  fallbackSrc?: string
  aspectRatio?: number
  loadingBehavior?: LoadingBehavior
  onLoad?: () => void
  onError?: () => void
  retryOnError?: boolean
  errorMessage?: string
  containerSx?: SxProps<Theme>
}

const getContainerStyle = (
  theme: Theme,
  props: {
    fill?: boolean
    width?: number
    height?: number
    aspectRatio?: number
  }
): SxProps<Theme> => ({
  position: 'relative',
  width: props.fill ? '100%' : props.width,
  height: props.fill ? '100%' : props.height,
  paddingTop: props.aspectRatio ? `${(1 / props.aspectRatio) * 100}%` : undefined,
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]
})

export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      priority = false,
      className = '',
      sizes = '100vw',
      fill = false,
      quality = 90,
      style,
      blur = true,
      fallbackSrc,
      aspectRatio,
      loadingBehavior,
      onLoad,
      onError,
      retryOnError = true,
      errorMessage = 'Failed to load image',
      containerSx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [retryCount, setRetryCount] = useState(0)
    const maxRetries = 3

    const handleLoad = (): void => {
      setLoading(false)
      setError(false)
      onLoad?.()
    }

    const handleError = (): void => {
      setError(true)
      setLoading(false)
      onError?.()
    }

    const handleRetry = (): void => {
      if (retryCount < maxRetries) {
        setLoading(true)
        setError(false)
        setRetryCount(prev => prev + 1)
      }
    }

    return (
      <Box
        sx={{
          ...getContainerStyle(theme, { fill, width, height, aspectRatio }),
          ...containerSx
        }}
        className={className}
      >
        {!error && (
          <Image
            ref={ref}
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            quality={quality}
            sizes={sizes}
            fill={fill}
            style={{
              objectFit: (style?.objectFit as ObjectFit) || 'cover',
              transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.standard
              }),
              opacity: loading ? 0 : 1,
              ...style
            }}
            onLoadingComplete={handleLoad}
            onError={handleError}
            loading={loadingBehavior || (priority ? 'eager' : 'lazy')}
            {...props}
          />
        )}

        {loading && !error && (
          <Skeleton
            variant="rectangular"
            animation={blur ? 'pulse' : false}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'
            }}
          />
        )}

        {error && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                theme.palette.mode === 'light' ? alpha(theme.palette.error.light, 0.1) : alpha(theme.palette.error.dark, 0.1),
              p: 2
            }}
          >
            <BrokenImageIcon
              sx={{
                fontSize: 40,
                color: theme.palette.error.main,
                mb: 1
              }}
            />
            <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
              {errorMessage}
            </Typography>
            {retryOnError && retryCount < maxRetries && (
              <IconButton
                onClick={handleRetry}
                size="small"
                sx={{
                  mt: 1,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        )}

        {fallbackSrc && error && (
          <Image
            src={fallbackSrc}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            style={{
              objectFit: (style?.objectFit as ObjectFit) || 'cover',
              opacity: 0.5
            }}
          />
        )}
      </Box>
    )
  }
)

OptimizedImage.displayName = 'OptimizedImage'

// Export types
export type { OptimizedImageProps, ObjectFit }

// Type-safe utility function for creating image configurations
type ImageConfig = Partial<OptimizedImageProps>

export const createImageConfig = (
  config: ImageConfig
): React.ForwardRefExoticComponent<OptimizedImageProps & React.RefAttributes<HTMLImageElement>> => {
  const ConfiguredImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>((props, ref) => (
    <OptimizedImage {...config} {...props} ref={ref} />
  ))

  ConfiguredImage.displayName = 'ConfiguredImage'
  return ConfiguredImage
}

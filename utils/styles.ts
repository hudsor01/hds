export const gradientStyles = {
  text: {
    background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  background: {
    background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
    color: 'white',
  },
  backgroundHover: {
    background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
    color: 'white',
  },
  section: {
    background: 'linear-gradient(180deg, rgba(0, 127, 255, 0.05) 0%, rgba(0, 89, 178, 0.05) 100%)',
    borderTop: '1px solid',
    borderBottom: '1px solid',
    borderColor: 'divider',
    py: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0, 127, 255, 0.1) 30%, rgba(0, 89, 178, 0.1) 90%)',
    zIndex: 0,
  },
} as const

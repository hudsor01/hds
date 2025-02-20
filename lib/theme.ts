import {
    createTheme,
    responsiveFontSizes
} from '@mui/material/styles'
import type {
    PaletteOptions,
    ThemeOptions
} from '@mui/material/styles'

// Define custom palette colors
const palette: PaletteOptions = {
    primary: {
        main: '#2563EB', // Modern blue
        light: '#60A5FA',
        dark: '#1E40AF',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#10B981', // Emerald
        light: '#34D399',
        dark: '#059669',
        contrastText: '#FFFFFF'
    },
    error: {
        main: '#EF4444',
        light: '#F87171',
        dark: '#DC2626'
    },
    warning: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706'
    },
    info: {
        main: '#3B82F6',
        light: '#60A5FA',
        dark: '#2563EB'
    },
    success: {
        main: '#10B981',
        light: '#34D399',
        dark: '#059669'
    },
    grey: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827'
    },
    background: {
        default: '#FFFFFF',
        paper: '#F9FAFB'
    },
    text: {
        primary: '#1F2937',
        secondary: '#4B5563',
        disabled: '#9CA3AF'
    }
}

// Define custom typography
const typography = {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01562em'
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.00833em'
    },
    h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '0em'
    },
    h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '0.00735em'
    },
    h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '0em'
    },
    h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '0.0075em'
    },
    subtitle1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
    },
    subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: '0.00714em'
    },
    body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
    },
    body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em'
    },
    button: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: '0.02857em',
        textTransform: 'none'
    },
    caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: '0.03333em'
    },
    overline: {
        fontSize: '0.75rem',
        fontWeight: 600,
        lineHeight: 2.66,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase'
    }
}

// Define custom shape properties
const shape = {
    borderRadius: 8
}

// Define custom transitions
const transitions = {
    duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195
    },
    easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    }
}

// Define custom component overrides
const components: ThemeOptions['components'] = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '6px',
                textTransform: 'none',
                fontWeight: 500,
                padding: '8px 16px'
            },
            contained: {
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'none'
                }
            },
            outlined: {
                borderWidth: '1.5px',
                '&:hover': {
                    borderWidth: '1.5px'
                }
            }
        }
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: '6px'
                }
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: '12px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
            }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: '#FFFFFF',
                color: '#1F2937'
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                backgroundColor: '#FFFFFF',
                borderRight: '1px solid #E5E7EB'
            }
        }
    },
    MuiTableHead: {
        styleOverrides: {
            root: {
                backgroundColor: '#F9FAFB',
                '& .MuiTableCell-root': {
                    color: '#4B5563',
                    fontWeight: 600
                }
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            root: {
                borderBottom: '1px solid #E5E7EB'
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: '6px'
            }
        }
    }
}

// Create and export the theme
const themeOptions: ThemeOptions = {
    palette,
    typography,
    shape,
    transitions,
    components
}

let theme = createTheme(themeOptions)
theme = responsiveFontSizes(theme)

export { theme }

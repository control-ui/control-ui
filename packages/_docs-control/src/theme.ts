import { createTheme, adaptV4Theme } from '@mui/material/styles'
import { Theme } from '@mui/material/styles'

// @ts-ignore
declare module '@mui/styles' {
    type DefaultTheme = Theme
}

const universal = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 460,
            md: 760,
            lg: 1280,
            xl: 1920,
        },
    },
    typography: {
        fontSize: 14,
        h1: {
            fontSize: '2.7rem',
        },
        h2: {
            fontSize: '2.25rem',
        },
        h3: {
            fontSize: '1.9rem',
        },
        h4: {
            fontSize: '1.75rem',
        },
        h5: {
            fontSize: '1.75rem',
        },
        h6: {
            fontSize: '1.25rem',
        },
        subtitle1: {
            fontWeight: 'bold',
            fontSize: '1.125rem',
        },
        subtitle2: {
            fontWeight: 'bold',
        },
        body1: {
            letterSpacing: '0.0185em',
        },
        body2: {
            letterSpacing: '0.01em',
        },
    },
    shape: {
        borderRadius: 0,
    },
}

// eslint-disable-next-line deprecation/deprecation
const themeDark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#05aeca',
            dark: '#033944',
        },
        secondary: {
            // light: '#d8eed4',
            main: '#bd90e0',
            // dark: '#002634',
        },
        background: {
            paper: '#04252f',
            default: '#001820',
        },
        text: {
            primary: '#c6c4c4',
            secondary: '#acc9c5',
        },
        action: {
            hoverOpacity: 0.2,
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {root: {backgroundImage: 'unset'}},
        },
    },
    ...universal,
})

// eslint-disable-next-line deprecation/deprecation
const themeLight = createTheme(adaptV4Theme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0590a7',
            dark: '#033944',
        },
        secondary: {
            light: '#d8eed4',
            main: '#37936c',
            dark: '#002634',
        },
        background: {
            paper: '#e8e8e8',
            default: '#cecece',
        },
        text: {
            primary: '#001f29',
            secondary: '#001820',
        },
        action: {
            hoverOpacity: 0.2,
        },
    },
    ...universal,
}))

export const themes = {
    dark: themeDark,
    light: themeLight,
}

import React from 'react'
import { DefaultTheme } from '@material-ui/styles/defaultTheme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

export interface ThemeDark {
    id: 'dark'
    other: 'light'
}

export interface ThemeLight {
    id: 'light'
    other: 'dark'
}

export type ThemeSettings = {
    [key: string]: DefaultTheme
}

export interface AppThemeProps {
    themes: ThemeSettings
    defaultDark?: boolean
    dark?: ThemeDark
    light?: ThemeLight
    fallback?: string
}

const storeItem = 'theme'

const ThemeSwitchContext = React.createContext<AppThemeContext>({
    switchTheme: (target?: string) => target && null,
    themes: {},
    theme: {},
})

export type switchTheme = (target?: string) => void

export interface AppThemeContext {
    switchTheme: switchTheme
    themes: ThemeSettings
    theme: DefaultTheme
}

export const useSwitchTheme = (): AppThemeContext => React.useContext(ThemeSwitchContext)

export const AppTheme = (
    {
        themes,
        defaultDark = true,
        dark = {id: 'dark', other: 'light'},
        light = {id: 'light', other: 'dark'},
        fallback = 'dark',
        children,
    }: React.PropsWithChildren<AppThemeProps>,
): React.ReactElement => {
    const [theme, setTheme] = React.useState(() => {
        const initial =
            Object.keys(themes).length > 1 ?
                window.matchMedia ?
                    (defaultDark ?
                        window.matchMedia('(prefers-color-scheme: dark)').matches ? dark.id : dark.other :
                        window.matchMedia('(prefers-color-scheme: light)').matches ? light.id : light.other)
                    : fallback
                : defaultDark ? dark.id : light.id
        const local = window.localStorage.getItem(storeItem)
        return local && themes[local] ? local : initial
    })

    const switchTheme = React.useCallback((target = '') => {
        setTheme((currentTheme) => {
            let nextTheme
            if (typeof target === 'string' && target) {
                nextTheme =
                    Object.keys(themes)
                        .reduce((previous, current) =>
                            current === target ? current : previous)
            } else {
                nextTheme =
                    Object.keys(themes)
                        .reduce((previous, current) =>
                            previous === currentTheme ? current : previous)
            }

            window.localStorage.setItem(storeItem, nextTheme)

            return nextTheme
        })
    }, [setTheme, themes])

    return <ThemeSwitchContext.Provider value={{theme, themes, switchTheme}}>
        <MuiThemeProvider theme={themes && themes[theme] ? themes[theme] : {}}>
            {children}
        </MuiThemeProvider>
    </ThemeSwitchContext.Provider>
}

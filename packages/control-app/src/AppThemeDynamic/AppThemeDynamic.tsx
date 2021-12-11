import React from 'react'
import { AppTheme, AppThemeProps } from '@control-ui/app/AppTheme'
import { ThemeSettings } from '@control-ui/app/AppTheme'

export type setThemes = (themes: ThemeSettings | ((themes: ThemeSettings) => ThemeSettings)) => void

export const AppThemeDynamicContext = React.createContext<setThemes>(() => null)

export const useAppThemeDynamic = (): setThemes => React.useContext(AppThemeDynamicContext)

export const AppThemeDynamic: React.ComponentType<React.PropsWithChildren<AppThemeProps>> = (
    {
        children,
        themes,
        ...props
    },
) => {
    const [dynThemes, setThemes] = React.useState<ThemeSettings>(themes)

    return <AppThemeDynamicContext.Provider value={setThemes}>
        <AppTheme themes={dynThemes} {...props}>
            {children}
        </AppTheme>
    </AppThemeDynamicContext.Provider>
}

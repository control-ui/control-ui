import React from 'react'
import { useTheme } from '@mui/material/styles'
import type { Breakpoint } from '@mui/material/styles'

export type setOpenHandler = (currentOpen: boolean) => boolean
export type setOpen = (open: boolean | setOpenHandler) => void

export interface DrawerProviderContext {
    open: boolean
    setOpen: setOpen
}

export interface DrawerProviderProps {
    // from this breakpoint onwards the drawer is open by default on initial mount
    breakpointOpen?: Breakpoint
}

const DrawerContext = React.createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, o => o])

export const useDrawer = (): DrawerProviderContext => {
    const [open, setOpen] = React.useContext(DrawerContext)
    return {open, setOpen}
}

export const DrawerProvider = ({children, breakpointOpen = 'md'}: React.PropsWithChildren<DrawerProviderProps>): React.ReactElement => {
    const {breakpoints} = useTheme()
    const contextState = React.useState(() => breakpoints.values[breakpointOpen] < window.innerWidth)

    return <DrawerContext.Provider value={contextState}>
        {children}
    </DrawerContext.Provider>
}

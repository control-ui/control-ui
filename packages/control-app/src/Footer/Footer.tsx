import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Container from '@mui/material/Container'

export const Footer = ({children}: React.PropsWithChildren<any>): React.ReactElement => {
    const {palette} = useTheme()
    return <footer style={{
        flexShrink: 0,
        flexGrow: 0,
        background: palette.background.paper,
        borderTop: '1px solid ' + palette.divider,
        paddingTop: 2,
        paddingBottom: 2,
    }}>
        <Container maxWidth={false} style={{display: 'flex'}}>
            {children}
        </Container>
    </footer>
}

import React, { ReactNode } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import Typography from '@mui/material/Typography'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

export interface AccordionPanel {
    id: string
    headline: string
    content: string
    actions?: ReactNode
}

export const Accordions = ({initial = [], panels}: { initial?: string[], panels: AccordionPanel[] }) => {
    const uid = React.useId()
    const [selected, setSelected] = React.useState(initial)

    const toggle = React.useCallback(
        id => () => setSelected(selected => {
            selected.indexOf(id) === -1 ? selected.push(id) : selected.splice(selected.indexOf(id), 1)
            return [...selected]
        }),
        [setSelected],
    )

    return panels.map(panel => (
        <Accordion key={panel.id} expanded={selected.indexOf(panel.id) !== -1} onChange={toggle(panel.id)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={'cui-' + uid + '-' + panel.id + '-content'}
                id={'cui-' + uid + '-' + panel.id + '-header'}
            >
                <Typography style={{fontWeight: 'bold'}}>
                    {panel.headline}
                </Typography>
            </AccordionSummary>
            <AccordionDetails id={'cui-' + uid + '-' + panel.id + '-content'}>
                {panel.content}
            </AccordionDetails>
            {panel.actions ? <AccordionActions>
                {panel.actions}
            </AccordionActions> : null}
        </Accordion>
    ))
}

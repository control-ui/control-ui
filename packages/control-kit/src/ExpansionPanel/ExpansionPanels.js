import React from "react";
import {useUID} from "react-uid";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

export const ExpansionPanels = ({initial = [], panels}) => {
    const uid = useUID();
    const [selected, setSelected] = React.useState(initial);

    const toggle = React.useCallback(
        id => () => setSelected(selected => {
            selected.indexOf(id) === -1 ? selected.push(id) : selected.splice(selected.indexOf(id), 1);
            return [...selected];
        }),
        [setSelected]
    );

    return panels.map(panel => (
        <ExpansionPanel key={panel.id} expanded={selected.indexOf(panel.id) !== -1} onChange={toggle(panel.id)}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={'cui-' + uid + '-' + panel.id + '-content'}
                id={'cui-' + uid + '-' + panel.id + '-header'}
            >
                <Typography style={{fontWeight: 'bold'}}>
                    {panel.headline}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails id={'cui-' + uid + '-' + panel.id + '-content'}>
                {panel.content}
            </ExpansionPanelDetails>
            {panel.actions ? <ExpansionPanelActions>
                {panel.actions}
            </ExpansionPanelActions> : null}
        </ExpansionPanel>
    ))
};

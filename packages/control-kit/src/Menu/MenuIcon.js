import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useUID} from "react-uid";
import {AccessTooltipIcon} from "@control-ui/kit/Tooltip";

const StyledMenu = withStyles({
    paper: {},
})(props => (
    <Menu
        elevation={3}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

export const MenuIcon = ({style, maxHeight = 48 * 4.5, Icon, color = 'inherit', size = 'medium', title, options, renderOption, selected, onSelect, width = '20ch'}) => {
    const uid = useUID();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={style}>
            <IconButton
                color={color}
                aria-label={title}
                aria-controls={'cui-' + uid}
                aria-haspopup="true"
                onClick={handleClick}
                size={size}
            >
                <AccessTooltipIcon title={title}>
                    <Icon color={color}/>
                </AccessTooltipIcon>
            </IconButton>
            <StyledMenu
                id={'cui-' + uid}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight,
                        width,
                    },
                }}
            >
                {selected ?
                    options.map(option => {
                        return <MenuItem key={option} dense selected={option === selected} onClick={() => {
                            handleClose();
                            onSelect(option);
                        }}>
                            {renderOption(option)}
                        </MenuItem>
                    })
                    : options.map((Option, i) => <Option key={i} handleClose={handleClose}/>)}
                {}
            </StyledMenu>
        </div>
    );
};

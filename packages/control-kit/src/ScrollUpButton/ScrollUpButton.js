import React from "react";
import {IconButton,} from "@material-ui/core";
import {ArrowUpward} from "@material-ui/icons";
import {AccessTooltipIcon} from "@control-ui/kit/Tooltip";

export const ScrollUpButton = ({scrollContainer}) => {
    const [scrolledPages, setScrolledPage] = React.useState(0);

    const handleScroll = React.useCallback(() => {
        const scrolledPgs = (scrollContainer.current.scrollTop / scrollContainer.current.clientHeight).toFixed(1) * 1;
        if(scrolledPgs !== scrolledPages) {
            setScrolledPage(scrolledPgs);
        }
    }, [scrolledPages, scrollContainer]);

    React.useEffect(() => {
        const scrollCurrent = scrollContainer.current;
        scrollCurrent.addEventListener('scroll', handleScroll);
        return () => scrollCurrent.removeEventListener('scroll', handleScroll);
    }, [handleScroll, scrollContainer]);

    return <IconButton
        tabIndex="-1"
        style={{
            position: 'fixed', minWidth: 'auto', bottom: 20, right: 20, zIndex: 1000,
            pointerEvents: scrolledPages > 0.9 ? 'all' : 'none',
            opacity: scrolledPages > 0.9 ? 1 : 0,
            transition: 'opacity 0.25s ease-in-out',
        }}
        onClick={() => scrollContainer.current.scrollTo(0, 0)}>
        <AccessTooltipIcon title={'back to top of page'}>
            <ArrowUpward fontSize={'small'}/>
        </AccessTooltipIcon>
    </IconButton>;
};

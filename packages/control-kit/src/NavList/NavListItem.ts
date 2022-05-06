import { Route } from '@control-ui/routes/Route'

export interface NavListItemProps<R extends Route = Route> {
    route: R
    level: number
    dense?: boolean
    // for e.g. closing nav on mobile when clicking on item
    onClick?: () => void
}

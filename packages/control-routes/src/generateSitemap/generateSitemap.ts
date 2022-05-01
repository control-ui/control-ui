import { Route } from '@control-ui/routes'
import { flattenRoutes } from '@control-ui/routes/flattenRoutes'

export const generateSitemap = <R extends Route = Route>(
    hostname: string,
    routes: R,
    filter: (route: R) => boolean,
    changeFreqDefault: string = 'weekly',
): string[] => {
    const flatRoutes = flattenRoutes(routes, filter, (route) => {
        return {
            path: route.path,
            changeFreq: route.nav?.changeFreq || changeFreqDefault,
        }
    })
    return flatRoutes.map(({path, changeFreq}) => `
    <url>
        <loc>${hostname + path}</loc>
        <changefreq>${changeFreq}</changefreq>
    </url>`)
}

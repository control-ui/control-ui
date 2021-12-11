const {routes} = require('./src/routes');
const process = require('process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const args = process.argv;
args.splice(0, 2);
const hostname = args[0];
const dist = args[1];

if(!hostname || !dist) {
    console.error('hostname and dist must be set `node sitemap.js https://example.org ./sitemap.xml`');
    process.exit(1);
}

console.log('Building sitemap for host ' + hostname);

const routing = routes(() => () => null);

const runRoutes = (route, found = []) => {
    if(route.routes) {
        route.routes.forEach(route => runRoutes(route, found));
    } else {
        found.push(route)
    }

    return found;
};

const routePaths = runRoutes(routing);

const sitemapBase = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

const sitemap = sitemapBase(routePaths.map(({path, nav: {changeFreq = 'weekly'}}) => `
    <url>
        <loc>${hostname + path}</loc>
        <changefreq>${changeFreq}</changefreq>
    </url>`).join(''));

fs.writeFile(path.resolve(dist), sitemap, (err) => {
    if(err) {
        console.error('Failed saving sitemap to ' + path.resolve(dist), err);
        return;
    }

    console.log('Saved sitemap with ' + routePaths.length + ' urls in ' + path.resolve(dist));
});

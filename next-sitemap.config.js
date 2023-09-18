// https://www.npmjs.com/package/next-sitemap
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL, generateRobotsTxt: true, output: 'export' // Must be equal with output option in next.config
}

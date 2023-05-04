import BrowserSyncPlugin from 'browser-sync-webpack-plugin';




/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    webpack: (config, {dev, isServer}) => {
        const serverSideOrProd = isServer || !dev
        if (!serverSideOrProd) config.plugins.push(new BrowserSyncPlugin({
            host: '0.0.0.0', port: 4000, open: false, proxy: 'http://localhost:3000/'
        }, {
            reload: true, injectChanges: true
        }))

        return config
    }

}

export default nextConfig

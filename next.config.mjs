import BrowserSyncPlugin from 'browser-sync-webpack-plugin';




/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: true,

    experimental: {
        typedRoutes: true
    },

    output: 'export',

    // https://www.npmjs.com/package/next-image-export-optimizer
    images: {
        loader: 'custom', imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    }, transpilePackages: ['next-image-export-optimizer'], env: {
        nextImageExportOptimizer_exportFolderPath: 'out',
        nextImageExportOptimizer_quality: 80,
        nextImageExportOptimizer_storePicturesInWEBP: true,
        nextImageExportOptimizer_exportFolderName: 'images',
        nextImageExportOptimizer_generateAndUseBlurImages: true
    },


    compress: true,

    modularizeImports: {
        '@mui/material': {
            transform: '@mui/material/{{member}}'
        }
    },

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

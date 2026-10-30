/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    reactStrictMode: true,
    images: {
        loader: 'custom',
        imageSizes: [32, 64, 128, 256, 384],
        deviceSizes: [640, 750, 1080, 1440, 1920],
    },
    transpilePackages: ['next-image-export-optimizer'],
    env: {
        nextImageExportOptimizer_exportFolderPath: 'out',
        nextImageExportOptimizer_quality: '75',
        nextImageExportOptimizer_storePicturesInWEBP: 'true',
        nextImageExportOptimizer_exportFolderName: 'optimized-images',
        nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    },
};
export default nextConfig;

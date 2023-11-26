/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns : [
            {
                protocol : 'https',
                hostname : 'images.cdn1.buscalibre.com',
                port: '',
                pathname : '/**',
            },
            {
                protocol : 'https',
                hostname : 'images.cdn3.buscalibre.com',
                port: '',
                pathname : '/**',
            },
            {
                protocol : 'https',
                hostname : 'images.cdn2.buscalibre.com',
                port: '',
                pathname : '/**',
            },
            {
                protocol : 'http',
                hostname : 'dummyimage.com',
                port: '',
                pathname : '/**',
            }
        ]
    }
}

module.exports = nextConfig

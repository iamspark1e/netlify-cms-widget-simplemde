import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'

const devConfig = defineConfig({
    plugins: [react()],
    server: {
        port: process.env.PORT || 30081,
        host: '0.0.0.0'
    }
})
const prodConfig = defineConfig({
    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.jsx'),
            name: 'main',
            // the proper extensions will be added
            fileName: 'main',
            formats: ['iife'],
        },
        sourcemap: true
        // rollupOptions: {
        //     // make sure to externalize deps that shouldn't be bundled
        //     // into your library
        //     external: ['vue'],
        //     output: {
        //         // Provide global variables to use in the UMD build
        //         // for externalized deps
        //         globals: {
        //             vue: 'Vue',
        //         },
        //     },
        // },
    }
})

export default (process.env.NODE_ENV === 'production' ? prodConfig : devConfig)
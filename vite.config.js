import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
    if(mode !== 'production' || command === 'serve') {
        return {
            plugins: [react()],
            server: {
                port: process.env.PORT || 30081,
                host: '0.0.0.0'
            },
            preview: {
                port: process.env.PORT || 30081,
                host: '0.0.0.0'
            },
            publicDir: 'public'
        }
    }
    return {
        plugins: [react(), cssInjectedByJsPlugin()],
        build: {
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: resolve(__dirname, 'src/index.jsx'),
                name: 'SimpleMDEControl',
                // the proper extensions will be added
                fileName: 'main',
                formats: ['umd'],
            },
            sourcemap: true,
            define: {
                'process.env.NODE_ENV': JSON.stringify(mode),
            }
            // rollupOptions: {
            //     // make sure to externalize deps that shouldn't be bundled
            //     // into your library
            //     external: ['react'],
            //     output: {
            //         // Provide global variables to use in the UMD build
            //         // for externalized deps
            //         globals: {
            //             react: 'React',
            //         },
            //     },
            // },
        }
    }
})
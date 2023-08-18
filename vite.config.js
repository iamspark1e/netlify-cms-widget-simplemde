import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'
import replace from '@rollup/plugin-replace'

export default defineConfig(({ command, mode }) => {
    if (mode !== 'production' || command === 'serve') {
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
        plugins: [react(), cssInjectedByJsPlugin(), replace({
            'process.env.NODE_ENV': JSON.stringify(mode),
        })],
        build: {
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: resolve(__dirname, 'src/index.jsx'),
                name: 'SimpleMDE',
                // the proper extensions will be added
                // fileName: 'main',
                fileName: (format, entryName) => {
                    // const extension = format === 'iife' ? 'js' : 'cjs';
                    // return `js/${entryName}.${extension}`;
                    return format === 'iife' ? "main.js" : `main.${format}.js`
                  },
                formats: ['umd', 'iife'],
            },
            sourcemap: true
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
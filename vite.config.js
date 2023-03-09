import { defineConfig } from "vite"
import { resolve } from 'path'

// vite.config.js
export default defineConfig({
    server: {
        port: 5173,
        host: '127.0.0.1'
    },
    root: 'src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                info: resolve(__dirname, 'src/info/index.html'),
                deli: resolve(__dirname, 'src/deli/index.html'),
                grab_and_go: resolve(__dirname, 'src/grab-and=go/index.html'),
                stuco: resolve(__dirname, 'src/stuco/index.html'),
            },
        },
    },
});
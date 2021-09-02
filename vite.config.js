import { defineConfig } from 'vite';
import build from './src/build';

export default defineConfig({
    plugins: [build()]
});
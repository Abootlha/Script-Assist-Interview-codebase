import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	server: {
		port: 5175
	},
	plugins: [react()],
	build: {
		outDir: path.resolve(__dirname, 'build'),
	}
});

import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const libraries = await readdir('.', { withFileTypes: true })
	.then((entries) =>
		entries.flatMap((entry) =>
			entry.isDirectory && entry.name.startsWith('with-')
				? [[entry.name, `${entry.path}/index.html`]]
				: [],
		),
	)
	.then((entries) => Object.fromEntries(entries));

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				...libraries,
			},
		},
	},
});

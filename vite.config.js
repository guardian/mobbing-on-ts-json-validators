import { readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const path = dirname(fileURLToPath(import.meta.url), '..');

const libraries = await readdir(path, {
	withFileTypes: true,
})
	.then((entries) =>
		entries.flatMap((entry) =>
			entry.isDirectory && entry.name.startsWith('with-')
				? [[entry.name, `${entry.path}/${entry.name}/index.html`]]
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

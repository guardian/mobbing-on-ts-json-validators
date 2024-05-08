import type { CapiItem } from './capi.ts';

function updateDOM(
	element: HTMLDivElement,
	capiItems: Array<CapiItem | Error> = [],
) {
	element.innerHTML = `
	<ul>
		${capiItems
			.map((item) => {
				if (item instanceof Error) {
					return `<li class="error">${item.name}: ${item.message}</li>`;
				}
				const { webTitle, webUrl } = item;
				return `<li><a href="${webUrl.href}" title="${webTitle}">${webTitle}</a></li>`;
			})
			.join('')}
	</ul>
	`;
}
const goodResponse: unknown = await import('./good.json');
const badResponse: unknown = await import('./bad.json');

const $good = document.querySelector<HTMLDivElement>('#good');
const $bad = document.querySelector<HTMLDivElement>('#bad');

export function init(parser: (data: unknown) => Array<CapiItem | Error>) {
	if (!$good || !$bad) {
		console.error('missing #good or #bad div');
		return; // we cannot update the DOM adequately
	}

	updateDOM($good, parser(goodResponse));
	updateDOM($bad, parser(badResponse));
}

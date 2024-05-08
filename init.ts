import type { CapiResponse } from './capi.ts';

type MaybeItem = CapiResponse['response']['results'][number] | Error;

function updateDOM(element: HTMLDivElement, capiItems: MaybeItem[] = []) {
	element.innerHTML = `
	<ul>
		${capiItems
			.map((item) => {
				if (item instanceof Error) {
					return `<li class="error">${item.name}: ${item.message}</li>`;
				}
				const { webTitle, webUrl } = item;
				return `<li><a class="gu" href="${webUrl.href}" title="${webTitle}">${webTitle}</a></li>`;
			})
			.join('')}
	</ul>
	`;
}
const goodResponse: unknown = await import('./good.json');
const badResponse: unknown = await import('./bad.json');

const $good = document.querySelector<HTMLDivElement>('#good');
const $bad = document.querySelector<HTMLDivElement>('#bad');

export function init(parser: (data: unknown) => MaybeItem[]) {
	if (!$good || !$bad) {
		console.error('missing #good or #bad div');
		return; // we cannot update the DOM adequately
	}

	updateDOM($good, parser(goodResponse));
	updateDOM($bad, parser(badResponse));
}

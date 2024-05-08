import type { CapiResponse } from './capi';
import './style.css';

function updateDOM(
	element: HTMLDivElement,
	capiItems: CapiResponse['response']['results'] = [],
) {
	element.innerHTML = `
	<ul>
		${capiItems
			.map(
				({ webUrl, webTitle }) =>
					`<li><a href="${webUrl.toString()}" title="${webTitle}">${webTitle}</a></li>`,
			)
			.join('')}
	</ul>
	`;
}
const goodResponse: unknown = await import('./good.json');
const badResponse: unknown = await import('./bad.json');

const $good = document.querySelector<HTMLDivElement>('#good');
const $bad = document.querySelector<HTMLDivElement>('#bad');

export function init(parser: (data: unknown) => CapiResponse | undefined) {
	if (!$good || !$bad) {
		console.error('missing #good or #bad div');
		return; // we cannot update the DOM adequately
	}

	updateDOM($good, parser(goodResponse)?.response.results);
	updateDOM($bad, parser(badResponse)?.response.results);
}

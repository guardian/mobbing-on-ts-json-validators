import type { SafeParseReturnType } from 'zod';
import type { CapiItem, CapiResponse } from './schema';
import { capiResponse } from './schema';
import './style.css';

function jsonToCapiResponse(
	json: unknown,
): SafeParseReturnType<unknown, CapiResponse> {
	return capiResponse.safeParse(json);
}

function updateDOM(element: HTMLDivElement | null, capiItems: CapiItem[]) {
	if (!element) return;

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
const goodResults = jsonToCapiResponse(goodResponse);
const $good = document.querySelector<HTMLDivElement>('#good');
if (goodResults.success) {
	updateDOM($good, goodResults.data.response.results);
} else {
	console.warn(goodResults.error);
}

const badResponse: unknown = await import('./bad.json');
const badResults = jsonToCapiResponse(badResponse);
const $bad = document.querySelector<HTMLDivElement>('#bad');
if (badResults.success) {
	updateDOM($bad, badResults.data.response.results);
} else {
	console.warn(badResults.error);
}

import { isRight } from 'fp-ts/lib/Either';
import type { Validation } from 'io-ts';
import type { CapiItem } from './schema';
import { CapiResponseCodec } from './schema';
import './style.css';

interface CapiItemOld {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: string; // TODO use `Date` to be more type-safe
	webTitle: string;
	webUrl: string; // TODO use `URL` to be more type-safe
	apiUrl: string; // TODO use `URL` to be more type-safe
	fields: {
		headline: string;
		thumbnail: string; // TODO use `URL` to be more type-safe
	};
	isHosted: boolean;
	pillarId: string;
	pillarName: string;
}

interface CapiResponse {
	response: {
		results: CapiItemOld[];
	};
}

function jsonToCapiResponse(json: unknown): Validation<CapiResponse> {
	// TODO add JSON validation here

	return CapiResponseCodec.decode(json);
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
if (isRight(goodResults)) {
	updateDOM($good, goodResults.right.response.results);
} else {
	console.warn(goodResponse);
}

const badResponse: unknown = await import('./bad.json');
const badResults = jsonToCapiResponse(badResponse);
const $bad = document.querySelector<HTMLDivElement>('#bad');
if (isRight(badResults)) {
	updateDOM($bad, badResults.right.response.results);
}

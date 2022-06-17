import './style.css';

import {
	array,
	assert,
	boolean,
	is,
	number,
	object,
	string,
	type,
} from 'superstruct';

const CapiItemType = object({
	id: string(),
	type: string(),
	sectionId: string(),
	sectionName: string(),
	webPublicationDate: string(), // TODO use `Date` to be more type-safe
	webTitle: string(),
	webUrl: string(), // TODO use `URL` to be more type-safe
	apiUrl: string(), // TODO use `URL` to be more type-safe
	fields: object({
		headline: string(),
		thumbnail: string(), // TODO use `URL` to be more type-safe
	}),
	isHosted: boolean(),
	pillarId: string(),
	pillarName: string(),
});

const CapiResponseType = type({
	response: type({
		results: array(CapiItemType),
	}),
});

interface CapiItem {
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
		results: CapiItem[];
	};
}

function logCapiResponse(data: CapiResponse) {
	console.log(data);
}

function jsonToCapiResponse(json: unknown): CapiResponse {
	// TODO add assert(data, Article)JSON validation here
	if (is(json, CapiResponseType)) {
		logCapiResponse(json);
	}

	assert(json, CapiResponseType);
	return json;
}

function updateDOM(element: HTMLDivElement, capiItems: CapiItem[]) {
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
const $good = document.querySelector<HTMLDivElement>('#good')!;
updateDOM($good, goodResults.response.results);

const badResponse: unknown = await import('./bad.json');
const badResults = jsonToCapiResponse(badResponse);
const $bad = document.querySelector<HTMLDivElement>('#bad')!;
updateDOM($bad, badResults.response.results);

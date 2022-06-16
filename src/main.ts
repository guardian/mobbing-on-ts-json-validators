import './style.css';

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

function jsonToCapiResponse(json: unknown): CapiResponse {
	// TODO add JSON validation here
	return json as CapiResponse;
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

import type { CapiItem, CapiResponse } from './schema';

interface CapiItemLegacy {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: Date; // TODO use `Date` to be more type-safe
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

interface CapiResponseLegacy {
	response: {
		results: CapiItemLegacy[];
	};
}

type AreEquals<A, B> = A extends B ? (B extends A ? true : false) : false;

export const item: AreEquals<CapiItemLegacy, CapiItem> = true;
export const resp: AreEquals<CapiResponseLegacy, CapiResponse> = true;

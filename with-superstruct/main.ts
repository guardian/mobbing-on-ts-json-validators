import {
	StructError,
	array,
	assert,
	boolean,
	is,
	object,
	string,
	type,
} from 'superstruct';
import { init } from '../init.ts';

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

init((json) => {
	try {
		assert(json, CapiResponseType);
		return json.response.results;
	} catch (error) {
		return error instanceof StructError ? [error] : [];
	}
});

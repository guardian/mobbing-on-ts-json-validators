import { array, boolean, object, string, date, coerce, define } from 'superstruct';
import { init } from '../init.ts';

const isUrl = (value: unknown): value is URL =>
	value instanceof URL;

const Url = define<URL>('Url', isUrl);

const urlCoercion = coerce(Url, string(), (value) => new URL(value));

const capiItem = object({
	id: string(),
	type: string(),
	sectionId: string(),
	sectionName: string(),
	webPublicationDate: coerce(date(), string(), (value) => new Date(value)),
	webTitle: string(),
	webUrl: urlCoercion,
	apiUrl: urlCoercion,
	fields: object({
		headline: string(),
		thumbnail: urlCoercion,
	}),
	isHosted: boolean(),
	pillarId: string(),
	pillarName: string(),
});

const capiResponse = object({
	response: object({
		results: array(capiItem),
	}),
});

init((data) => {
	try {
		const result = capiResponse.mask(data);
		return result.response.results;
	} catch (e) {
		console.warn(e);
		return [new Error('Could not parse')]
	}
});

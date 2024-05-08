import type { z } from 'zod';
import { array, boolean, date, object, preprocess, string } from 'zod';
import { init } from '../init.ts';

const dateSchema = preprocess((arg) => {
	if (typeof arg === 'string' || arg instanceof Date) {
		return new Date(arg);
	}
	throw Error('Invalid date');
}, date());
export type DateSchema = z.infer<typeof dateSchema>;

const url = () =>
	string()
		.url()
		.transform((value) => new URL(value));

const capiItem = object({
	id: string(),
	type: string(),
	sectionId: string(),
	sectionName: string(),
	webPublicationDate: string().transform((value) => new Date(value)),
	webTitle: string(),
	webUrl: url(),
	apiUrl: url(),
	fields: object({
		headline: string(),
		thumbnail: url(),
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

export type CapiItem = z.infer<typeof capiItem>;
export type CapiResponse = z.infer<typeof capiResponse>;

init((data) => capiResponse.parse(data));

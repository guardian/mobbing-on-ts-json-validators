import type { z } from 'zod';
import { array, boolean, date, object, preprocess, string } from 'zod';

const dateSchema = preprocess((arg) => {
	if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
}, date());
type DateSchema = z.infer<typeof dateSchema>;

const capiItem = object({
	id: string(),
	type: string(),
	sectionId: string(),
	sectionName: string(),
	webPublicationDate: date(), // TODO use `Date` to be more type-safe
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

const capiResponse = object({
	response: object({
		results: array(capiItem),
	}),
});

type CapiItem = z.infer<typeof capiItem>;
type CapiResponse = z.infer<typeof capiResponse>;

// const exampleCapiItem: CapiItem = {
// 	id: 'string',
// 	type: 'string',
// 	sectionId: 'string',
// 	sectionName: 'string',
// 	webPublicationDate: 'string',
// 	webTitle: 'string',
// 	webUrl: 'string',
// 	apiUrl: 'string',
// 	fields: {
// 		headline: 'string',
// 		thumbnail: 'string',
// 	},
// 	isHosted: true,
// 	pillarId: 'string',
// 	pillarName: 'someting',
// };
// const exampleCapiItemZod: CapiItemZod = exampleCapiItem;

// Sense-check

export { capiResponse };
export type { CapiResponse, CapiItem };

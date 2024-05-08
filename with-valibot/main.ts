import {
	array,
	boolean,
	isoTimestamp,
	object,
	safeParse,
	string,
	transform,
	url as urlString,
} from 'valibot';
import { init } from '../init.ts';

const url = () => transform(string([urlString()]), (value) => new URL(value));

const capiItem = object({
	id: string(),
	type: string(),
	sectionId: string(),
	sectionName: string(),
	webPublicationDate: transform(
		string([isoTimestamp()]),
		(value) => new Date(value),
	),
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

// export type CapiItem = z.infer<typeof capiItem>;
// export type CapiResponse = z.infer<typeof capiResponse>;

init((data) => {
	const result = safeParse(capiResponse, data);
	if (!result.success) {
		return result.issues.map(
			(issue) => new Error(`${issue.reason}: ${issue.message}`),
		);
	}
	return result.output.response.results;
});

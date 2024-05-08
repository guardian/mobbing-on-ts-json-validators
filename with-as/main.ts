import type { RawCapiResponse } from '../capi.ts';
import { init } from '../init.ts';

init((json) => {
	const data = json as RawCapiResponse;

	return data.response.results.map((result) => ({
		...result,
		webPublicationDate: new Date(result.webPublicationDate),
		webUrl: new URL(result.webUrl),
		apiUrl: new URL(result.apiUrl),
		fields: {
			...result.fields,
			thumbnail: new URL(result.fields.thumbnail),
		},
	}));
});

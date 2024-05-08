import * as t from 'io-ts';
import { init } from './main';

const CapiItemCodec = t.type({
	id: t.string,
	type: t.string,
	sectionId: t.string,
	sectionName: t.string,
	webPublicationDate: t.string,
	webTitle: t.string,
	webUrl: t.string,
	apiUrl: t.string,
	fields: t.type({
		headline: t.string,
		thumbnail: t.string,
	}),
	isHosted: t.boolean,
	pillarId: t.string,
	pillarName: t.string,
});

type CapiItem = t.TypeOf<typeof CapiItemCodec>;

const CapiResponseCodec = t.type({
	response: t.type({
		results: t.array(CapiItemCodec),
	}),
});

init((data) => CapiResponseCodec.decode(data));

type CapiResponse = t.TypeOf<typeof CapiResponseCodec>;

export { CapiItemCodec, CapiResponseCodec };
export type { CapiItem, CapiResponse };

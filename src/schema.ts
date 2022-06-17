import * as t from 'io-ts';

const CapiItemCodec = t.type({
	id: t.string,
	type: t.string,
	sectionId: t.string,
	sectionName: t.string,
	webPublicationDate: t.string, // TODO use `Date` to be more type-saf,
	webTitle: t.string,
	webUrl: t.string, // TODO use `URL` to be more type-saf,
	apiUrl: t.string, // TODO use `URL` to be more type-saf,
	fields: t.type({
		headline: t.string,
		thumbnail: t.string, // TODO use `URL` to be more type-saf,
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

type CapiResponse = t.TypeOf<typeof CapiResponseCodec>;

export { CapiItemCodec, CapiResponseCodec };
export type { CapiItem, CapiResponse };

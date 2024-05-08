import { either, isRight } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { init } from './main';

/** from https://github.com/gcanti/io-ts/blob/master/index.md#custom-types */
const DateFromString = new t.Type<Date, string, unknown>(
	'DateFromString',
	(u): u is Date => u instanceof Date,
	(u, c) =>
		either.chain(t.string.validate(u, c), (s) => {
			const d = new Date(s);
			return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d);
		}),
	(a) => a.toISOString(),
);

const UrlFromString = new t.Type<URL, string, unknown>(
	'UrlFromString',
	(u): u is URL => u instanceof URL,
	(u, c) =>
		either.chain(t.string.validate(u, c), (s) => {
			return URL.canParse(s) ? t.success(new URL(s)) : t.failure(u, c);
		}),
	(a) => a.toString(),
);

const CapiItemCodec = t.type({
	id: t.string,
	type: t.string,
	sectionId: t.string,
	sectionName: t.string,
	webPublicationDate: DateFromString,
	webTitle: t.string,
	webUrl: UrlFromString,
	apiUrl: UrlFromString,
	fields: t.type({
		headline: t.string,
		thumbnail: UrlFromString,
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

init((data) => {
	const result = CapiResponseCodec.decode(data);
	if (isRight(result)) {
		return result.right;
	}
	return undefined;
});

type CapiResponse = t.TypeOf<typeof CapiResponseCodec>;

export { CapiItemCodec, CapiResponseCodec };
export type { CapiItem, CapiResponse };

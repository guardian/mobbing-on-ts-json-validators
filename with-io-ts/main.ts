import { either, isLeft } from 'fp-ts/lib/Either.js';
import {
	array,
	boolean,
	failure,
	string,
	success,
	Type,
	type,
	// type TypeOf,
} from 'io-ts';
import { init } from '../init.ts';

/** from https://github.com/gcanti/io-ts/blob/master/index.md#custom-types */
const DateFromString = new Type<Date, string, unknown>(
	'DateFromString',
	(u): u is Date => u instanceof Date,
	(u, c) =>
		either.chain(string.validate(u, c), (s) => {
			const d = new Date(s);
			return isNaN(d.getTime()) ? failure(u, c) : success(d);
		}),
	(a) => a.toISOString(),
);

const UrlFromString = new Type<URL, string, unknown>(
	'UrlFromString',
	(u): u is URL => u instanceof URL,
	(u, c) =>
		either.chain(string.validate(u, c), (s) => {
			return !URL.canParse(s) ? failure(u, c) : success(new URL(s));
		}),
	(a) => a.toString(),
);

const CapiItemCodec = type({
	id: string,
	type: string,
	sectionId: string,
	sectionName: string,
	webPublicationDate: DateFromString,
	webTitle: string,
	webUrl: UrlFromString,
	apiUrl: UrlFromString,
	fields: type({
		headline: string,
		thumbnail: UrlFromString,
	}),
	isHosted: boolean,
	pillarId: string,
	pillarName: string,
});

// type CapiItem = TypeOf<typeof CapiItemCodec>;

const CapiResponseCodec = type({
	response: type({
		results: array(CapiItemCodec),
	}),
});

init((data) => {
	const result = CapiResponseCodec.decode(data);
	if (isLeft(result)) {
		return result.left.map(({ message, value, context }) =>
			Error(
				[
					message,
					value,
					context.flatMap(({ key }) => key).join(' &rarr; '),
				].join('\n'),
			),
		);
	}
	return result.right.response.results;
});

// type CapiResponse = TypeOf<typeof CapiResponseCodec>;

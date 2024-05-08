# Mobbing On... TS JSON Validators

Types are great. They provide safety, determinism, and confidence in the behaviour of your application.

When interacting with an external service we're (typically) handling JSON.

```ts
const untypedJson: unknown = {
	title: 'A newsworthy event just happened',
	body: 'A thrilling account of the event',
};
```

This makes it difficult to work with as we can't distinguish `untypedJson` from `someOtherUntypedJson`.
As a result any errors in our assumptions will very likely be first seen at runtime (often with a cryptic entry in Sentry).

Most languages have JSON validation libraries that, ultimately, provide a function which takes JSON and returns a custom type if it matches a particular shape, or throws (or returns an Either):

```ts
import { parse } from 'a-library';

interface MyType {
	title: string;
}

const typedJson: MyType = parse<MyType>(untypedJson);
```

Within the JavaScript and TypeScript ecosystems, there are a few JSON validation libraries. For example:

- [io-ts](https://gcanti.github.io/io-ts/)
- [zod](https://zod.dev/)
- [joi](https://joi.dev/)
- [typescript-is](https://github.com/woutervh-/typescript-is)
- Others

This repository is designed to help evaluate these libraries. Suggested criteria to evaluate include:

- Learning curve
- Developer Experience
- Testing

## Usage

1. Clone the repository `git clone git@github.com:guardian/mobbing-on-ts-json-validators.git`
2. Match your version of Node to [`.nvmrc`](.nvmrc)
3. Install dependencies: `npm i`
4. Start the app (`npm run dev`) and view it on [http://localhost:3000](http://localhost:3000)
5. Address the TODOs in [`src/main.ts`](src/main.ts)

Once up and running, you'll see two basic lists on the DOM with some basic styling of errors.
The aim is to use the JSON validator libraries to either:

- Fix the errors (i.e. mutate the data)
- Remove the errors (i.e. prevent the errors from being rendered in the first place)

## Notes

We don't actually make calls out to an external service.
Instead, we've saved a snapshot of a CAPI response to [good.json](src/good.json), and intentionally broken it to [bad.json](src/bad.json).
That is, this repository does not necessarily replicate a real world application.

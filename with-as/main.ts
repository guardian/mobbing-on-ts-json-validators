import type { CapiResponse } from '../capi.ts';
import { init } from '../init.ts';

function jsonToCapiResponse(json: unknown): CapiResponse {
	// TODO add JSON validation here
	return json as CapiResponse;
}

init(jsonToCapiResponse);

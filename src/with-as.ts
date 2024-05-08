import type { CapiResponse } from './capi';
import { init } from './main';

function jsonToCapiResponse(json: unknown): CapiResponse {
	// TODO add JSON validation here
	return json as CapiResponse;
}

init(jsonToCapiResponse);

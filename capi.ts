type RawCapiItem = {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
	fields: {
		headline: string;
		thumbnail: string;
	};
	isHosted: boolean;
	pillarId: string;
	pillarName: string;
};

export type RawCapiResponse = {
	response: {
		results: RawCapiItem[];
	};
};

export type CapiItem = {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: Date;
	webTitle: string;
	webUrl: URL;
	apiUrl: URL;
	fields: {
		headline: string;
		thumbnail: URL;
	};
	isHosted: boolean;
	pillarId: string;
	pillarName: string;
};

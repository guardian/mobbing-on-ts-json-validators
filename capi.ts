type CapiItem = {
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

export type CapiResponse = {
	response: {
		results: CapiItem[];
	};
};

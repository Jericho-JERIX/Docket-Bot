export type StatisticServiceGetGeneralResponse = {
	total_homeworks: number;
	total_active_homeworks: number;
	total_channels: number;
	total_files: number;
};

export type StatisticServiceType = {
	getGeneral: () => Promise<any>;
};

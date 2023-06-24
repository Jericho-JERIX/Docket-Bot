import axios from "axios";
import { StatisticServiceType } from "../types/services/StatisticServiceType";
import { BACKEND_URL } from "../constants/service";

export const StatisticService: StatisticServiceType = {
	getGeneral: async () => {
		return axios.get(`${BACKEND_URL}/statistic/general`);
	},
};

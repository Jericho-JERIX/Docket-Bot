import axios from "axios";
import { BACKEND_URL } from "../constants/service";
import { HomeworkServiceType } from "../types/services/HomeworkServiceType";
import { HomeworkType } from "../constants/homework";

export const HomeworkService: HomeworkServiceType = {
	create: async (discord_id, channel_id, body) => {
		return axios
			.post(
				`${BACKEND_URL}/account/${discord_id}/channel/${channel_id}/homework`,
				body
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
	getAll: async (channel_id, type) => {
		if (!type) type = HomeworkType.ALL;
		return axios
			.get(
				`${BACKEND_URL}/channel/${channel_id}` +
					`?type=${type.toUpperCase()}`
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
	update: async (discord_id, channel_id, homework_id, body) => {
		return axios
			.put(
				`${BACKEND_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`,
				body
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
	delete: async (discord_id, channel_id, homework_id) => {
		return axios
			.delete(
				`${BACKEND_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
};

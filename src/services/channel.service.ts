import axios from "axios";
import { BACKEND_URL } from "../constants/service";
import { ChannelServiceType } from "../types/services/ChannelServiceType";

export const ChannelService: ChannelServiceType = {
	getAll: async () => {
		return axios
			.get(`${BACKEND_URL}/channel`)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},

	openFile: async (discord_id, channel_id, file_id) => {
		return axios
			.put(
				`${BACKEND_URL}/account/${discord_id}/channel/${channel_id}/file/${file_id}`
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},

	edit: async (discord_id, channel_id, body) => {
		return axios
			.put(
				`${BACKEND_URL}/account/${discord_id}/channel/${channel_id}`,
				body
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
};

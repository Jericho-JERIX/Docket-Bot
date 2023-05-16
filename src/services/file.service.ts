import axios from "axios";
import { BACKEND_URL } from "../constants/service";
import { FileServiceType } from "../types/services/FileServiceType";

export const FileService: FileServiceType = {
	create: async (discord_id, channel_id, body) => {
		return axios
			.post(
				`${BACKEND_URL}/account/${discord_id}/channel/${channel_id}/file`,
				body
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
	getAll: async (discord_id) => {
		return axios
			.get(`${BACKEND_URL}/account/${discord_id}/file`)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
	edit: async (discord_id, file_id, body) => {
		return axios
			.put(`${BACKEND_URL}/account/${discord_id}/file/${file_id}`, body)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
	delete: async (discord_id, file_id) => {
		return axios
			.delete(`${BACKEND_URL}/account/${discord_id}/file/${file_id}`)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err.response;
			});
	},
};

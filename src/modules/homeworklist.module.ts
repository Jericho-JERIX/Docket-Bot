// const Homeworklist = {
// 	Title: ":bookmark: **Homeworklist 4.0**",
// 	Button: new ActionRow().addComponents(
// 		new MessageButton()
// 			.setLabel("📋 All")
// 			.setStyle("SECONDARY")
// 			.setCustomId("homeworklist-Type-ALL"),
// 		new MessageButton()
// 			.setLabel("📝 Assignment")
// 			.setStyle("PRIMARY")
// 			.setCustomId("homeworklist-Type-Assignment"),
// 		new MessageButton()
// 			.setLabel("🔔 Alert")
// 			.setStyle("SUCCESS")
// 			.setCustomId("homeworklist-Type-Alert"),
// 		new MessageButton()
// 			.setLabel("🔥 Exam")
// 			.setStyle("DANGER")
// 			.setCustomId("homeworklist-Type-Exam")
// 	),
// 	EmptyListMessage:
// 		"*-------------------------- EMPTY --------------------------*",
// 	File: (instance, count) => {
// 		return `\`\`\`📂 File: ${instance.filename} (${count})\`\`\``;
// 	},
// 	Card: (instance) => {
// 		const hw = new Homework(instance);
// 		if (hw.day_left == 0) {
// 			return `[\`${hw.day_name}\`.\`${fixSpace(
// 				hw.date,
// 				2,
// 				"0"
// 			)}/${fixSpace(hw.month, 2, "0")}\`] ${
// 				hw.alert_icon
// 			} **(\`เดี๋ยวนี้!\`)** ${hw.type_icon} \`[${fixSpace(
// 				hw.id,
// 				4,
// 				"0"
// 			)}]\` \`${hw.label}\``;
// 		}
// 		return `[\`${hw.day_name}\`.\`${fixSpace(hw.date, 2, "0")}/${fixSpace(
// 			hw.month,
// 			2,
// 			"0"
// 		)}\`] ${hw.alert_icon} **(\`${fixSpace(hw.day_left, 3)}\` วัน)** ${
// 			hw.type_icon
// 		} \`[${fixSpace(hw.id, 4, "0")}]\` \`${hw.label}\``;
// 	},
// 	list: async (channelId, type = "ALL") => {
// 		type = type.toUpperCase();
// 		var { status, data } = await getAllHomeworks(channelId);
// 		console.log(channelId);
// 		if (status >= 400) {
// 			console.log(status);
// 			return Homeworklist.DisplayBox(
// 				"❌ This channel has not opened any File yet"
// 			);
// 		}
// 		data.homeworks = data.homeworks.filter(
// 			(homework) => homework.timestamp * 1000 >= Date.now()
// 		);
// 		var total_length = data.homeworks.length;
// 		if (type !== "ALL") {
// 			data.homeworks = data.homeworks.filter(
// 				(homework) => homework.type === type
// 			);
// 		}
// 		var filtered_length = data.homeworks.length;
// 		var result = data.homeworks.map((homework) =>
// 			Homeworklist.Card(homework)
// 		);
// 		if (type !== "ALL") {
// 			return {
// 				content: `${Homeworklist.Title}\n\`\`\`📂 File: ${
// 					data.file.filename
// 				} (${total_length}) >> ${
// 					TypeIcon[type]
// 				} ${type} (${filtered_length})\`\`\`${
// 					filtered_length == 0
// 						? Homeworklist.EmptyListMessage
// 						: result.join("\n")
// 				}`,
// 				components: [Homeworklist.Button],
// 			};
// 		} else {
// 			return {
// 				content: `${Homeworklist.Title}\n${Homeworklist.File(
// 					data.file,
// 					result.length
// 				)}${
// 					result.length == 0
// 						? Homeworklist.EmptyListMessage
// 						: result.join("\n")
// 				}`,
// 				components: [Homeworklist.Button],
// 			};
// 		}
// 	},
// 	OpenFile: {
// 		File: (count) => {
// 			return `\`\`\`📦 File Storage (${count}/5)\`\`\``;
// 		},
// 		Card: (instance, isCurrent) => {
// 			return `${isCurrent ? ":pushpin:" : ":file_folder:"} \`[${fixSpace(
// 				instance.file_id,
// 				4,
// 				"0"
// 			)}]\` \`${instance.filename}\``;
// 		},
// 		ButtonSelector: (files, current_file_id) => {
// 			var buttons = files.slice(0, 5).map((file) =>
// 				new MessageButton()
// 					.setLabel(
// 						`${
// 							file.file_id == current_file_id ? "📂" : "📁"
// 						} [${fixSpace(file.file_id, 4, "0")}] ${file.filename}`
// 					)
// 					.setStyle(
// 						file.file_id == current_file_id
// 							? "SUCCESS"
// 							: "SECONDARY"
// 					)
// 					// .setDisabled(file.file_id == current_file_id)
// 					.setCustomId(
// 						`homeworklist-OpenFile-${file.owner_id}-${file.file_id}`
// 					)
// 			);
// 			while (buttons.length < 5) {
// 				buttons.push(
// 					new MessageButton()
// 						.setLabel(`< Empty File >`)
// 						.setStyle("SECONDARY")
// 						.setDisabled(true)
// 						.setCustomId(
// 							`homeworklist-OpenFile-00000-empty-${buttons.length}`
// 						)
// 				);
// 			}
// 			return new MessageActionRow().addComponents(...buttons);
// 		},
// 	},
// 	DisplayBox: (message) => {
// 		return {
// 			content: Homeworklist.Title,
// 			embeds: [
// 				new MessageEmbed().setDescription(message).setColor("#ffde82"),
// 			],
// 		};
// 		return `${Homeworklist.Title}\n\`\`\`${message}\`\`\``;
// 	},
// };

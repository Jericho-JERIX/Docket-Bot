import { readFileSync } from "fs";
import { prisma } from "../src/database/prisma";

const homeworkFilename = 'api_homework.json';
const homeworkFileFilename = 'api_homeworkfile.json';
const homeworkChannelFilename = 'api_homeworkchannel.json';

const homeworks = JSON.parse(readFileSync(homeworkFilename, 'utf8'));
const homeworkFiles = JSON.parse(readFileSync(homeworkFileFilename, 'utf8'));
const homeworkChannels = JSON.parse(readFileSync(homeworkChannelFilename, 'utf8'));

(async () => {

    const homeworkFileMigrateResult = await prisma.homeworkFile.createMany({
        data: homeworkFiles.map((file: any) => {
            return {
                file_id: file.file_id,
                owner_id: file.owner_id,
                filename: file.filename,
            }
        })
    })

    console.log(`Migrate homework file result: ${homeworkFileMigrateResult.count}`)

    const homeworkChannelMigrateResult = await prisma.homeworkChannel.createMany({
        data: homeworkChannels.map((channel: any) => {
            return {
                can_edit: channel.can_edit === 1,
                channel_id: channel.channel_id,
                enable_notification: channel.enable_notification === 1,
                file_id: channel.file_id,
            }
        })
    })

    console.log(`Migrate homework channel result: ${homeworkChannelMigrateResult.count}`)

    const homeworkMigrateResult = await prisma.homework.createMany({
        data: homeworks.map((homework: any) => {
            return {
                homework_id: homework.homework_id,
                file_id: homework.file_id,
                is_active: homework.is_active === 1,
                date: homework.date,
                month: homework.month,
                year: homework.year,
                timestamp: new Date(homework.timestamp * 1000),
                day_name: homework.day_name,
                type: homework.type,
                label: homework.label,
                no_deadline: homework.no_deadline === 1,
                is_checked: homework.is_checked === 1,
            }
        })
    })

    console.log(`Migrate homework result: ${homeworkMigrateResult.count}`)
})()
import { prisma } from "../database/prisma"
import { FileService } from "../services/file.service"
import { testChannelId, testDiscordId } from "./mocks/general"

beforeEach(async () => {
    await prisma.homework.deleteMany()
    await prisma.homeworkFile.deleteMany()
    await prisma.homeworkChannel.deleteMany()
})

describe('FileService', () => {
    it('Should create new File', async () => {
        
        const response = await FileService.create(
            testDiscordId,
            testChannelId,
            { filename: 'test-filename' }
        )

        expect(response).toBeTruthy()
        expect(response.channel.enable_notification).toBe(false)
        expect(response.channel.can_edit).toBe(false)
        expect(response.file.filename).toBe('test-filename')

    })
})
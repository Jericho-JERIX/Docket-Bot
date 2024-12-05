import { prisma } from "../database/prisma"
import { FileService } from "../services/file.service"
import { testChannelId, testDiscordId } from "./mocks/general"

beforeAll(async () => {
    await prisma.homework.deleteMany()
    await prisma.homeworkChannel.deleteMany()
    await prisma.homeworkFile.deleteMany()
})

afterAll(async () => {
    await prisma.homework.deleteMany()
    await prisma.homeworkChannel.deleteMany()
    await prisma.homeworkFile.deleteMany()
})

describe('FileService', () => {
    it('Should create new File, status should be 200', async () => {
        
        const response = await FileService.create(
            testDiscordId,
            testChannelId,
            { filename: 'test-filename' }
        )

        expect(response).toBeTruthy()
        expect(response.status).toBe(200)

    })
})
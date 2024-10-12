import { prisma } from "../database/prisma"

beforeAll(async () => {
    await prisma.homeworkChannel.deleteMany()
})

const testDiscordId = "111"
const testChannelId = "222"
const testFileId = 1

describe('ChannelService', () => {
    it('Should create new')
})
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let CheckInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase


describe('CheckIn Use Case', () => {

    beforeEach(() => {
        CheckInRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(CheckInRepository)

        vi.useFakeTimers()
    })

    afterEach(() => { vi.useRealTimers() })

    it('should be able to check in', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        const { checkIn } = await sut.execute({
            userID: '123',
            gymId: '123'
        })

        console.log(checkIn.created_at)
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            userID: '123',
            gymId: '123'
        })

        await expect(() => sut.execute({
            userID: '123',
            gymId: '123'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be abel to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            userID: '123',
            gymId: '123'
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        const { CheckIn } = await sut.execute({
            userID: '123',
            gymId: '123'
        })

        expect(CheckIn.id).toEqual(expect.any(String))
    })
})
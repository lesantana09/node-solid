import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, expect, it, beforeEach} from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase


describe('Get User Metrics Use Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })

    it('should be able to get check-in count from metrics', async () => {
        await checkInsRepository.create({
            user_id: '123',
            gym_id: '456'
        })

        await checkInsRepository.create({
            user_id: '123',
            gym_id: '457'
        })        
        const { checkInsCount }  = await sut.execute({
            userId: '123',
        });

        expect(checkInsCount).toEqual(2)
    })
})
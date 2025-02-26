import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, expect, it, beforeEach} from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase


describe('Fetch User Check-in History Use Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
    })

    it('should be able to fetch check-in history', async () => {
        await checkInsRepository.create({
            user_id: '123',
            gym_id: '456'
        })

        await checkInsRepository.create({
            user_id: '123',
            gym_id: '457'
        })        
        const { checkIns }  = await sut.execute({
            userId: '123',
        });

        expect(checkIns).toHaveLength(2)
    })
 
})
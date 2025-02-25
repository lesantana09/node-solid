import { describe, expect, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase


describe('Create Gym Use Case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it('should be able to create a gym', async () => {

        const { gym } = await sut.execute({
            title: 'Academia 1',
            description: null,
            phone: null,
            latitude: -23.4323968,
            longitude: -46.5174528 
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})
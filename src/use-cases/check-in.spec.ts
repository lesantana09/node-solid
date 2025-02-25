import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let CheckInsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase


describe('CheckIn Use Case', () => {

    beforeEach(async () => {
        CheckInsRepository = new InMemoryCheckInRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(CheckInsRepository, gymsRepository)

        gymsRepository.create({
            id: '123',
            title: 'Academia 1',
            description: '',
            phone:  '',
            latitude: -23.4323968,
            longitude: -46.5174528
        });


        vi.useFakeTimers()
    })

    afterEach(() => { vi.useRealTimers() })

    it('should be able to check in', async () => {


        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        
        const { CheckIn }  = await sut.execute({
            userID: '123',
            gymId: '123',
            userLatitude: -23.4323968,
            userLongitude: -46.5174528
        });

        expect(CheckIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            userID: '123',
            gymId: '123',
            userLatitude: -23.4323968,
            userLongitude: -46.5174528         
        })

        await expect(() => sut.execute({
            userID: '123',
            gymId: '123',
            userLatitude: -23.4323968,
            userLongitude: -46.5174528          
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
    })

    it('should be abel to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            userID: '123',
            gymId: '123',
            userLatitude: -23.4323968,
            userLongitude: -46.5174528
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        const { CheckIn } = await sut.execute({
            userID: '123',
            gymId: '123',
            userLatitude: -23.4323968,
            userLongitude: -46.5174528
        })

        expect(CheckIn.id).toEqual(expect.any(String))
    }) 

    it('should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: '124',
            title: 'Academia 1',
            description: 'Academia 1',
            phone: '123',
            latitude: new Decimal(-23.1384087),
            longitude: new Decimal(-45.7493778)
        });

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        
        await expect(() => sut.execute({
            userID: '123',
            gymId: '124',
            userLatitude: -23.4323968,
            userLongitude: -46.5174528
        })).rejects.toBeInstanceOf(MaxDistanceError);
    })    
})
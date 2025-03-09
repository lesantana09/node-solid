import { describe, expect, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase


describe('Search Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JavaScript Gym',            
            description: '',
            phone:  '',
            latitude: -23.4323968,
            longitude: -46.5174528            
        }) 
        await gymsRepository.create({
            title: 'TypeScript Gym',            
            description: '',
            phone:  '',
            latitude: -23.4323968,
            longitude: -46.5174528            
        }) 
     
        const { gyms }  = await sut.execute({
            query: 'JavaScript',
            page: 1,
        });

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym' }),            
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {
        
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Javascript Gym ${i}`,            
                description: '',
                phone:  '',
                latitude: -23.4323968,
                longitude: -46.5174528            
            })     
        }

        const { gyms }  = await sut.execute({
            query: 'Javascript',
            page: 2,
        });

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Javascript Gym 21' }),
            expect.objectContaining({ title: 'Javascript Gym 22' })
        ])
    })    


})
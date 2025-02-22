import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository"
import { GymsRepository } from "@/repositories/prisma/gyms-repository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates"

interface CheckInUseCaseRequest {
    userID: string
    gymId: string
    userLatitude: number
    userLongitude: number
}
interface CheckInUseCaseResponse {
    CheckIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) { }

    async execute({ 
        userID, 
        gymId, 
        userLatitude, 
        userLongitude 
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS){
            throw new Error('User is too far from gym')
        }

        const checkInSameDate = await this.checkInsRepository.findByUserIdOnDate(userID, new Date())


        if (checkInSameDate){
            throw new Error('User already checked in today')
        }

        const CheckIn = await this.checkInsRepository.create({
            user_id: userID,
            gym_id: gymId
        })

        return { CheckIn }
    }
}
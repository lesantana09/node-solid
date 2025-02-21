import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository"
import { CheckIn } from "@prisma/client"

interface CheckInUseCaseRequest {
    userID: string
    gymId: string
}
interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userID, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const checkInSameDate = await this.checkInsRepository.findByUserIdOnDate(userID, new Date())

        if (checkInSameDate){
            throw new Error('User already checked in today')
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userID,
            gym_id: gymId
        })

        return { checkIn }
    }
}
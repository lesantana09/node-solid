import { UsersRepository } from "@/repositories/users-repository"

import { compare } from "bcryptjs"
import { User } from "@prisma/client"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

interface AuthenticateuseCaseRequest {
    email: string
    password: string
}
interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(
        private usersRepository: UsersRepository,
    ) { }

    async execute({ email, password }: AuthenticateuseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}
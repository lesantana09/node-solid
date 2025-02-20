import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factory/make-authenticate-usecase';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string().min(6)
    });

    const { email, password } = authenticateBodySchema.parse(request.body);
    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        await authenticateUseCase.execute({ password, email })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }
    reply.status(200).send()
}
import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify';
import { hash } from 'bcryptjs';
import { registerUseCase } from '@/use-cases/register';

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);
    try{
        await registerUseCase({name, password, email})
    } catch {
        return reply.status(409).send()
    }
    reply.status(201).send()
}
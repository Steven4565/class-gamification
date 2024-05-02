import type { PageServerLoad } from "../$types";
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async (event) => {
    const id = event.params.id;

    const res = await prisma.userActivities.findMany({
        where: {
            classId: Number(id)
        },
        include: {
            actionType: true,
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            class: {
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            }
        }
    });
    return { userActivities: res };
};
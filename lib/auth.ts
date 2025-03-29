import { currentUser } from '@clerk/nextjs/server';
import{ prisma }from './prisma';

export async function getUserOrCreate() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    return null;
  }
  
  // Try to find user in the database
  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id }
  });
  
  // If user doesn't exist, create them
  if (!user) {
    try {
      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0].emailAddress,
        }
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }
  
  return user;
}
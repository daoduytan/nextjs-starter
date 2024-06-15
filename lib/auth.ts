import { prisma } from './prisma';
import { checkPassword } from '@/helps/password';
import { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const nextAuthOption: NextAuthOptions = {
    providers: [
        Credentials({
            // The name to display on the sign-in form (e.g., 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {};

                if (!email || !password) {
                    throw new Error('Missing username or password');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                // if user doesn't exist or password doesn't match
                if (!user || !(await checkPassword(password, user.password))) {
                    return null;
                }

                console.log({ user });

                return user;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        async jwt({ token, user }) {
            // Persist the user id to the token right after signin
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id;
            // Send user data to the client
            session.user.id = token.sub;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
};

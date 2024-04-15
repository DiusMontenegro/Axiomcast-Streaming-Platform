import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
    return (
        <main className="flex-center h-screen w-full py-8">
            <SignUp />
        </main>
    );
};

export default SignUpPage;

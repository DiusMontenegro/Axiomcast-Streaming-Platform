import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MobileNav from './MobileNav';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
    return (
        <nav className="flex-between flex fixed z-50 w-full bg-light-1 px-6 py-4 lg:px-10">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    alt="AxiomCast logo"
                    width={32}
                    height={32}
                    className="max-sm:size-10"
                />
                <p className="text-[26px] font-extrabold max-sm:hidden">
                    AxiomCast
                </p>
            </Link>
            <div className="flex-between gap-5">
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <MobileNav />
            </div>
        </nav>
    );
};

export default Navbar;

'use client';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src={'./icons/hamburger.svg'}
                        alt="menu"
                        width={36}
                        height={36}
                        className="cursor-pointer sm:hidden"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-light-1">
                    <Link href="/" className="flex items-center gap-1">
                        <Image
                            src="/icons/logo.svg"
                            alt="AxiomCast logo"
                            width={20}
                            height={20}
                            className="max-sm:size-10"
                        />
                        <p className="text-[26px] font-extrabold">AxiomCast</p>
                    </Link>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16">
                                {sidebarLinks.map((link) => {
                                    const isActive =
                                        pathname === link.route ||
                                        pathname.startsWith(`${link.route}/`);

                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                className={cn(
                                                    'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                                                    {
                                                        'bg-blue-1 text-white':
                                                            isActive,
                                                    }
                                                )}
                                            >
                                                <Image
                                                    src={link.imgURL}
                                                    alt={link.label}
                                                    width={24}
                                                    height={24}
                                                />
                                                <p className="font-semibold">
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;

import React, { ReactNode } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?: string;
}

const MeetingModal = ({
    isOpen,
    onClose,
    title,
    className,
    handleClick,
    buttonText,
    image,
    buttonIcon,
    children,
}: MeetingModalProps) => {
    return (
        <Dialog open={isOpen}>
            <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-light-1 px-6 py-9 text-[#1c1c1c]">
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image
                                src="image"
                                alt="image"
                                width={72}
                                height={72}
                            />
                        </div>
                    )}
                    <h1
                        className={cn(
                            'text-3xl font-bold leading-[42px]',
                            className
                        )}
                    >
                        {title}
                    </h1>
                    {children}
                    <Button
                        className="bg-blue-1 text-[#f2f2f2] shadow-lg rounded-md hover:border hover:border-[#00AEEF] hover:text-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                        onClick={handleClick}
                        type="button"
                    >
                        {buttonIcon && (
                            <Image
                                src={buttonIcon}
                                alt="button-icon"
                                width={13}
                                height={13}
                            />
                        )}{' '}
                        &nbsp;
                        {buttonText || 'Schedule Meeting'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MeetingModal;

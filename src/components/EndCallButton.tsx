'use client';

import {
    CallState,
    useCall,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();

    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner =
        localParticipant &&
        call?.state.createdBy &&
        localParticipant.userId === call?.state.createdBy.id;

    if (!isMeetingOwner) return null;

    return (
        <Button
            onClick={async () => {
                await call.endCall();
                router.push('/');
            }}
            className="bg-red-500 rounded-2xl hover:bg-opacity-50 hover:bg-red-500 font-semibold text-white"
        >
            End Call for everyone
        </Button>
    );
};

export default EndCallButton;

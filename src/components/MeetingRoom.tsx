import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutList, Search, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) return <Loader />;

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />;
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />;
            default:
                return <SpeakerLayout participantsBarPosition="right" />;
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4">
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full ma-w-[100px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn(' h-[calc(100vh-86px)] hidden ml-2', {
                        'show-block': showParticipants,
                    })}
                >
                    <CallParticipantsList
                        onClose={() => setShowParticipants(false)}
                    />
                </div>

                <div className="fixed bottom-0 flex w-full justify-center items-center gap-5 flex-wrap">
                    <CallControls />

                    <DropdownMenu>
                        <div className="flex items-center ">
                            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-gray-300 px-4 py-2 hover:bg-opacity-50">
                                <LayoutList size={20} />
                            </DropdownMenuTrigger>
                        </div>

                        <DropdownMenuContent className="border-light-1 bg-light-1">
                            {['Grid', 'Speaker-Left', 'Speaker-Right'].map(
                                (item, index) => (
                                    <div key={index}>
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onClick={() =>
                                                setLayout(
                                                    item.toLowerCase() as CallLayoutType
                                                )
                                            }
                                        >
                                            {item}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="border" />
                                    </div>
                                )
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <CallStatsButton />

                    <button
                        title="Button"
                        type="button"
                        onClick={() => setShowParticipants((prev) => !prev)}
                    >
                        <div className="cursor-pointer rounded-2xl bg-gray-300 px-4 py-2 hover:bg-opacity-50">
                            <Users size={20} />
                        </div>
                    </button>

                    {!isPersonalRoom && <EndCallButton />}
                </div>
            </div>
        </section>
    );
};

export default MeetingRoom;

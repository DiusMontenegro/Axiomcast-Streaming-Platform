'use client';

import { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';

const MeetingTypeList = () => {
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    });
    const [meetingState, setMeetingState] = useState<
        | 'isScheduleMeeting'
        | 'isJoiningMeeting'
        | 'isInstantMeeting'
        | undefined
    >();

    const router = useRouter();
    const { user } = useUser();
    const client = useStreamVideoClient();

    const createMeeting = async () => {
        if (!user || !client) return;

        try {
            if (!values.dateTime) {
                toast({
                    title: 'Please select a date and time',
                });
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create a call');

            const startsAt =
                values.dateTime.toISOString() ||
                new Date(Date.now()).toISOString();

            const description = values.description || 'Instant meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });

            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }

            toast({
                title: 'Meeting successfully created',
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Failed to create meeting.',
            });
        }
    };

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an Instant Meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className="bg-sky-400"
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your Meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-pink-400"
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Checkout your recordings"
                handleClick={() => router.push('/recordings')}
                className="bg-purple-400"
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-green-400"
            />

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an instant meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;

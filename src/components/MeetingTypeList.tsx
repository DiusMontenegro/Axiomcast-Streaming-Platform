'use client';

import { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
        | 'isScheduleMeeting'
        | 'isJoiningMeeting'
        | 'isInstantMeeting'
        | undefined
    >();

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an Instant Meeting"
                handleClick={() => setMeetingState('isJoiningMeeting')}
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
        </div>
    );
};

export default MeetingTypeList;

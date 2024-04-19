import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react';

const Home = () => {
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Manila',
    };

    const time = now.toLocaleTimeString('en-PH', options);

    const dateOptions: Intl.DateTimeFormatOptions = {
        dateStyle: 'full',
        timeZone: 'Asia/Manila',
    };

    const date = new Intl.DateTimeFormat('en-PH', dateOptions).format(now);

    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <div className="h-[300px] w-full rounded-[20px] bg-slate-800 bg-cover">
                <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-5 lg:p-11">
                    <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
                        Upcoming meeting at 12:30 PM
                    </h2>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold lg:text-7xl">
                            {time}
                        </h1>
                        <p className="text-lg font-medium text-sky-200 lg:text-2xl">
                            {date}
                        </p>
                    </div>
                </div>
            </div>

            <MeetingTypeList />
        </section>
    );
};

export default Home;

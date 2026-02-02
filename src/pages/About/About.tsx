import React from 'react';
import VoteGrid from './VoteGrid';
import userDataRaw from '../../data/userDataRaw.json';

const AboutPage: React.FC = () => {
    // const [feedback, setFeedback] = useState<string>("");



    return (
        <div className="max-w-7xl mx-auto p-8 font-nikosh">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">আমাদের সম্পর্কে</h2>

            <VoteGrid rowData={userDataRaw} />


        </div>
    );
};

export default AboutPage;
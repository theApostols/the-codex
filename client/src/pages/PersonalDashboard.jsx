// import React, { useState, useEffect } from 'react';
// import SnippetCard from './SnippetCard';
// import { User, Snippet } from '../utils/API';
// // need to fix imports 


const PersonalDashboard = ({ userID }) => {
    const [snippets, setSnippets] = useState([]);

    useEffect(() => {
        //fetches the users snippets when the component mounts
        const fetchUserSnippets = async () => {
            try {
                const snippetsData = await User.getUserSnippets(userID);
                setSnippets(snippetsData);
            } catch (error) {
                console.log('error fetching user snippets', error);
            }
        };
        fetchUserSnippets();
    }, [userID]);
    return (
        <div>
            <h1>Personal Dashboard</h1>
            <div>
                {snippets.map((snippet) => (
                    <SnippetCard key={snippet._id} snippet={snippet} />
                ))}
            </div>
        </div>
    );
    
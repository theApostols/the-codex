import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../utils/queries'; 
import SnippetCard from '../components/SnippetCard'; 
import CommentCard from '../components/CommentCard'; 

    const PersonalDashboard = () => {
        const [userProfile, setUserProfile] = useState(null);
      
        const { loading, error, data } = useQuery(GET_USER_PROFILE);
      
        useEffect(() => {
          if (data && data.userProfile) {
            setUserProfile(data.userProfile);
          }
        }, [data]);
      
        if (loading) {
          return <p>Loading...</p>;
        }
      
        if (error) {
          console.error('Error fetching user profile:', error);
          return <p>Error fetching user profile</p>;
        }
      
        return (
          <div>
            {userProfile && (
              <>
                <h1>Welcome, {userProfile.username}!</h1>
                {/* Display user information */}
                <div>
                  <h2>Your Snippets</h2>
                  {userProfile.snippets.map((snippet) => (
                    <SnippetCard key={snippet.id} snippet={snippet} />
                  ))}
                </div>
                <div>
                  <h2>Your Comments</h2>
                  {userProfile.comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
                    <div>
                    <h2>Saved Snippets</h2>
                    {userProfile.savedsnippets.map((savedsnippets) => (
                        <SavedSnippets key={savedsnippets.id} />
                    ))}
                    </div>
                    <div>

                    </div>
              </>
            )}
          </div>
        );
      };
      
      export default PersonalDashboard;
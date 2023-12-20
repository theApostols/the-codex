import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../utils/queries';

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

          {/* Display saved snippets as cards/tiles */}
          <div>
            <h2>Saved Snippets</h2>
            {userProfile.savedSnippets.length > 0 ? (
              userProfile.savedSnippets.map((snippetId) => (
                <div key={snippetId} className="saved-snippet-card">
                  {/* Fetches and displays details about each saved snippet */}
                  <p>Snippet ID: {snippetId}</p>
                  {/* need to add more details here  */}
                </div>
              ))
            ) : (
              <p>No saved snippets yet.</p>
            )}
          </div>

          {/* Displays the users comments */}
          <div>
            <h2>Your Comments</h2>
            {userProfile.comments.length > 0 ? (
              userProfile.comments.map((comment) => (
                <p key={comment._id}>Comment: {comment.commentText}</p>
                // need to add details here
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {/* Displays the user props and drops on posts */}
          <div>
            <h2>Your Props/Drops</h2>
            {userProfile.props.length > 0 && (
              <div>
                <h3>Props</h3>
                {userProfile.props.map((prop) => (
                  <p key={prop}>Prop: {prop}</p>
                ))}
              </div>
            )}
            {userProfile.drops.length > 0 && (
              <div>
                <h3>Drops</h3>
                {userProfile.drops.map((drop) => (
                  <p key={drop}>Drop: {drop}</p>
                ))}
              </div>
            )}
            {userProfile.props.length === 0 && userProfile.drops.length === 0 && (
              <p>No props or drops yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalDashboard;
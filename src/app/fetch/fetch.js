
import React, { createContext, useState, useEffect, useContext } from 'react';


const PostsContext = createContext();

export const PostsProvider = ({children}) =>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
                cache:"force-cache",
                next:{
                    revalidate:3600
                }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data); 
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchPosts();
      }, []); 

      return (
        <PostsContext.Provider value={{ posts, loading, error }}>
          {children}
        </PostsContext.Provider>
      );
    }

    export const usePosts = () => {
        return useContext(PostsContext);
      };
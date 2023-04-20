import React, {useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Post = ({ posts }) => {   
    const { id } = useParams();   
    const navigate = useNavigate();
    const post = posts[id];
    console.log(post);

    useEffect(() => {
        if(!post) {
            navigate('/posts/');
            return;
        } 
    }, [post, navigate]);

    const formattedDate = post && post.published_at ? new Date(post.published_at).toLocaleDateString() : null;

    return (
        <div className='postsPage'>
            {post && (
                <div className='headline'>
                    <img className='bgd-posts' src={post.image} alt="bgd" />
                    <h1 className='posts-title'>{post.title}</h1>
                    <span className='posts-description'>{post.description}</span>
                    {post && post.author && post.author.name &&
                        <span className='by-author'>
                            By {post.author.name}
                        </span>
                    }
                </div>
            )}
            {post && (
                <div className='description-text'>
                    <div className='aside-block'>
                        <span className='date'>{formattedDate}</span> 
                        <svg className='line' width="35" height="1" viewBox="0 0 35 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="35" y2="0.5" stroke="#C4C4C4"/>
                        </svg>
                        <span className='reading-time'>{post.reading_time} minutes</span>
                    </div>
                    <span className='article'>{post.text}</span>
                    <svg className='underLine' width="860" height="1" viewBox="0 0 860 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="0.75" x2="860" y2="0.75" stroke="#C4C4C4" stroke-width="0.5"/>
                    </svg>
                    <div className='authorPost'>
                    {post.author && post.author.name && post.author.position && post.author.avatar && 
                        <>
                        <img className='authorAvatarPost' src={post.author.avatar} alt="avatar" />  
                        <div className='authorInfoPost'>
                            <span className='authorNamePost'>{post.author.name}</span>
                            <span className='authorPositionPost'>{post.author.position}</span> 
                        </div>
                    </>
                        }  
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;
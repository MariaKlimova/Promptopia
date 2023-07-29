'use client'
import { useState, useEffect} from 'react';
import PromptCard from '@components/PromptCard';


const PromptCardList = ({data, handleTagClick}) =>{
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => {
                return (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                )
            })}
        </div>
    )
}
const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(posts);


    const filterPosts = () => {
        setVisiblePosts(posts.filter(p => {
            const substr = searchText.toLowerCase();
            return (
                p?.creator?.name.toLowerCase().includes(substr)
                || p?.creator?.email.toLowerCase().includes(substr)
                || ('#'+p?.tag).toLowerCase().includes(substr)
                || p?.prompt.toLowerCase().includes(substr)
            )
        }))
    }
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    }

    useEffect(()=>{
        filterPosts()
    },[searchText, posts, filterPosts])

    const handleTagClick = (tag) => {
        setSearchText(!(tag.at(0) === '#') ? `#${tag}`:tag)
    }

    useEffect(()=>{
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();

            setPosts(data);
            setVisiblePosts(posts)
        }
        fetchPosts();
    }, [])

    return(
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type='text'
                    placeholder='search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList
                data={visiblePosts}
                handleTagClick={handleTagClick}
            />
        </section>
    )
};

export default Feed;

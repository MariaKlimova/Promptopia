'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from '@components/Profile';

export default function MyProfile() {
    const {data: session} = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        console.log(session)
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }
        if (session?.user?.id){
            fetchPosts();
        }
    }, [session])
    const handleEdit = (post) => {
        console.log('post', post.id)
        router.push(`/update-prompt?id=${post.id}`)
    }
    const handleDelete = async(post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt');
        if (hasConfirmed){
            try{
                const response = await fetch(`/api/prompt/${post.id}`, {
                    method: 'DELETE'
                })
                if (response.ok){
                    const filteredPosts = posts.filter(p=> {
                        console.log(p.id, post.id)
                        return p.id !== post.id
                    })
                    setPosts(filteredPosts);
                }

            }catch(e){
                console.log(e);
            }
        }
    }
    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from "@components/Form";

const EditPrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(()=>{
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data=await response.json();
            setPost({
                prompt: data?.prompt,
                tag: data?.tag,
            })
        }
        if (promptId) getPromptDetails();
    },[promptId])

    const router = useRouter();

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID not found');

        // console.log('3kkxs', session?.data.user.id)
        try{
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (response.ok){
                router.push('/')
            }
        } catch (e) {
            console.log(e);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type={"Edit"}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}
export default EditPrompt;


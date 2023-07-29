'use client';

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

import Form from "@components/Form";

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const session = useSession();
    const router = useRouter();

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // console.log('3kkxs', session?.data.user.id)
        try{
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    creator_id: session?.data.user?.id,
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
            type={"Create"}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}
export default CreatePrompt;


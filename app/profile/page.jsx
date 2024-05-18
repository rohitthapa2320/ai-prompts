"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProfileInfo from '@components/ProfileInfo';

const Profile = () => {
  const { data: session } = useSession();
  const [ prompts, setPrompts ] = useState([]);
  const [name, setName]= useState("");

  const router= useRouter();
  const searchParams= useSearchParams();

  const userId= searchParams.get('userId');

  useEffect(()=> {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${userId}/prompts`);
      const data= await response.json();

      setPrompts(data);
    }
    const fetchUserProfileInfo = async() => {
      const response = await fetch(`/api/profile/${userId}`);
      const data= await response.json();
      const {username}= data;
      setName(username);
    }
    if(userId){
      fetchPrompts();
      fetchUserProfileInfo();
    }
    
  },[])

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  }
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`,{
          method: 'DELETE'
        })
        const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);
        setPrompts(filteredPrompts);
      } catch (error) {
        console.log("error", error);
      }
    }
  }
  return(
    <Suspense>
      <ProfileInfo
        name={userId===session?.user.id?"My": name}
        desc={`Welcome to ${userId===session?.user.id?"My Personalised": name} Profile Page`}
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Suspense>
    
  )
}

export default Profile;
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const PromptCard = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete
}) => {
  const {data: session}= useSession();
  const [copied, setCopied] = useState('');
  const pathName= usePathname();

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  }
  return(
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Link href={`/profile?userId=${prompt.creator._id}`}>
            <Image
              src={prompt.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className='rounded-full object-contain'
            />
          </Link>
          <div className='flex flex-col'>
            <h3 className='font-santoshi font-semibold text-gray-900'>{prompt.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{prompt.creator.email}</p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt? '/assets/icons/tick.svg': '/assets/icons/copy.svg'
            }
            width={16}
            height={16}
            alt="copy button"
          />
        </div>
      </div>
      <p className='my-4 font-santoshi text-sm text-gray-700'>{prompt.prompt}</p>
      {
        pathName==='/'?(
        <p className='font-inter text-sm blue_gradient cursor-pointer'
          onClick={() =>{
            handleTagClick(prompt.tag)
          }}
        >
          {prompt.tag}
        </p>
        ):(
        <p className='font-inter text-sm blue_gradient'
        >
          {prompt.tag}
        </p>
        )
      }

      {
        session?.user.id === prompt.creator._id && pathName === '/profile' && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p className='font-inter text-sm green_gradient cursor-pointer'
              onClick={() =>{
                handleEdit(prompt);
              }}
            >
              Edit
            </p>
            <p className='font-inter text-sm orange_gradient cursor-pointer'
              onClick={() => {
                handleDelete(prompt);
              }}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard;
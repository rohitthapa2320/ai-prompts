'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({
  data,
  handleTagClick
}) => {
  return(
    <div className='mt-16 prompt_layout'>
      {
        data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [ prompts, setPrompts] = useState([]);

  const [ searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [ searchResults, setSearchResults ] = useState([]);

  const filteredPrompts = (searchText) => {
    const regex= new RegExp(searchText,"i");

    return prompts.filter((item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt));
  }
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const results = filteredPrompts(e.target.value);
        setSearchResults(results);
      }, 500)
    );
  }

  
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const results = filteredPrompts(tagName);
    setSearchResults(results);
  }

  useEffect(()=> {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt');
      const data= await response.json();

      setPrompts(data);
    }
    fetchPrompts();
  },[])
  return(
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Searh for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {
        searchText ? (
          <PromptCardList
            data={searchResults} 
            handleTagClick={handleTagClick}
          />
        ):(
          <PromptCardList
            data={prompts} 
            handleTagClick={handleTagClick}
          />
        )
      }
    </section>
  )
}

export default Feed;
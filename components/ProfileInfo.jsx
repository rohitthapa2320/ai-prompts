import PromptCard from "./PromptCard";

const ProfileInfo = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete
}) => {
  return(
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span> Profile
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className='mt-16 prompt_layout'>
      {
        data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))
      }
    </div>
    </section>
  )
}

export default ProfileInfo;
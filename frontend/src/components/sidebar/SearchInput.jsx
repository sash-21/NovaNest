import { useState } from "react";
import { MdOutlinePersonSearch } from "react-icons/md";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState(""); 
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3) {
      return toast.error(`Search Term must be atleast 3 characters long`);
    }

    const conversation = conversations.find((e) => e.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error(`No such user found!`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type="text" placeholder="Search Name..." className="input input-bordered input-warning w-full max-w-xs bg-black text-amber-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className="btn btn-square bg-black text-amber-500">
            <MdOutlinePersonSearch className="w-6 h-6 outline-none"/>
        </button>
    </form>
  )
}

export default SearchInput;
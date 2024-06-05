import { MdOutlinePersonSearch } from "react-icons/md";

const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
        <input type="text" placeholder="Search Name..." className="input input-bordered input-warning w-full max-w-xs bg-black text-amber-400" />
        <button type='submit' className="btn btn-square bg-black text-amber-500">
            <MdOutlinePersonSearch className="w-6 h-6 outline-none"/>
        </button>
    </form>
  )
}

export default SearchInput
import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for news"
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F48634]"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}

export default SearchBar

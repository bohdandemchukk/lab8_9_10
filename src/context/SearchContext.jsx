import {createContext, useState} from "react"


export const SearchContext = createContext();

export default function SearchProvider({children}) {
  const [searchValue, setSearchValue] = useState("")

  return (
    <SearchContext.Provider value = {{searchValue, setSearchValue}}>
      {children}
    </SearchContext.Provider>
  )
}
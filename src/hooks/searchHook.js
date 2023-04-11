import { useEffect, useState } from "react"

export function searchHook(text) {
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
      
        async function getSearchData() {
            const t = text
            if (t.length < 1) {
                t = ' '
            }
    
            try {
                const results = await searchWeather(t)
                if (results) {
                    setSearchResults(results)
                } else {
                    setSearchResults([])
                }
            } catch (error) {
                console.log(error);
            }
        }
    
        getSearchData()

    }, [text])

    return { searchResults }
    
}


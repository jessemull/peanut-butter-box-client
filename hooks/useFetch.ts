import { useEffect, useState } from 'react'

function useFetch<Data, Error> (url: string): { data: Data | undefined; error: Error | undefined; loading: boolean } {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Data>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json() // eslint-disable-line
        setData(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData() // eslint-disable-line
  }, [url])

  return { data, error, loading }
}

export default useFetch

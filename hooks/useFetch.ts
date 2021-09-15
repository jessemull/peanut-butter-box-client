import { useEffect, useState } from 'react'

function useFetch<Data, Error> (url: string, token?: string, lazy?: boolean): { data: Data | undefined; error: Error | undefined; fetchData: () => void, loading: boolean, refetchData: () => void } {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Data>()
  const [error, setError] = useState<Error>()

  const fetchData = async () => {
    try {
      setLoading(true)
      const options = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const response = await fetch(url, options)
      const data = await response.json() // eslint-disable-line
      setData(data)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  const refetchData = async () => {
    try {
      const options = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const response = await fetch(url, options)
      const data = await response.json() // eslint-disable-line
      setData(data)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    if (!lazy) {
      fetchData() // eslint-disable-line
    }
  }, [url])

  return { data, error, fetchData, loading, refetchData }
}

export default useFetch

import { useQuery } from '@tanstack/react-query'
import queryClient from './queryClient'

const useRQGlobalState = (key, initialData) => {
  const queryResult = useQuery({
    queryKey: [key],
    queryFn: () => initialData,
  })

  const setData = (value) => {
    queryClient.setQueryData([key], value)
  }

  return [queryResult, setData]
}

export default useRQGlobalState

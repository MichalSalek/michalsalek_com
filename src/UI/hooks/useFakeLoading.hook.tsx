import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'




type UseFakeLoadingHook = {
    resetLoadingProgressValue: () => void
    setLoading: Dispatch<SetStateAction<boolean>>
    loading: boolean
    loadingProgressValue: number
}

export const useFakeLoadingHook = (): UseFakeLoadingHook => {

    const [loading, setLoading] = useState(false)
    const [loadingProgressValue, setLoadingProgressValue] = useState(0)
    const loadingProgressInvervalID = useRef(0)
    useEffect(() => {
        if (!loading) {
            clearInterval(loadingProgressInvervalID.current)
            return () => void undefined
        }

        loadingProgressInvervalID.current = window?.setInterval(() => {
            setLoadingProgressValue((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 9))
        }, 190)
        return () => {
            clearInterval(loadingProgressInvervalID.current)
        }
    }, [loading])

    const resetLoadingProgressValue = (): void => {
        setLoadingProgressValue(0)
    }


    return {
        loading,
        setLoading,
        loadingProgressValue,
        resetLoadingProgressValue
    }

}

import { useEffect, useState } from "react"
import { sampleProject } from "../../data/project"
import { toCamel, useDataFetching } from '../util'

const FIANO_PROJECT_URL = process.env.NEXT_PUBLIC_FIANO_BACKEND_URL + "/api/projects"
const FIANO_PROJECT_DETAIL_URL = (id) => process.env.NEXT_PUBLIC_FIANO_BACKEND_URL + `/api/projects/${id}`

export function useProjectData() {
    const [error, isLoading, projects] = useDataFetching(FIANO_PROJECT_URL)
    return [error, isLoading, projects] 
}

export function useProjectDetailData(id) {
    const [project, setProject] = useState(undefined)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [apiError, apiIsLoading, fetchedProject] = useDataFetching(FIANO_PROJECT_DETAIL_URL(id))

    useEffect(() => {
        setProject(fetchedProject)
        setError(apiError)
        setIsLoading(apiIsLoading)
    })

    return [error, isLoading, project] 
}
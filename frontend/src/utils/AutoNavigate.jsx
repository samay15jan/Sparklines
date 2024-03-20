import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AutoNavigate = ({ location }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        const email = localStorage.getItem('email')
        const username = localStorage.getItem('username')
        const profilePic = localStorage.getItem('profilePic')

        if (userId && email && username && profilePic) {
            navigate(location)
        }
    }, [navigate])

    return null
}

export default AutoNavigate

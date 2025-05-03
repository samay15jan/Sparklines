import axios from 'axios'
import { useEffect, useState } from 'react'

interface HandleAPIParams {
    params: Record<string, string | number>
    endpoint: string
    key: string
}
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk4MTY4OWUwZTcwYjFkZTVlZjMxNjMiLCJpYXQiOjE3MzU2NTkxNzB9.m-LTy-jRwR0Z6nGGjZbSwL-Dou4UC-Y5B3l_yfP9T8s'

const handleAPI = async ({ params, endpoint, key }: HandleAPIParams) => {
    return await axios.get(`https://sparklines-backend.vercel.app${endpoint}`, {
        params,
        headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
        },
    })
}

interface PlaylistDataProps {
    playlistId: string
    returnResponse: (data: any) => void
    isLoading: (state: boolean) => void
}

const PlaylistData = ({ playlistId, returnResponse, isLoading }: PlaylistDataProps) => {
    useEffect(() => {
        if (!playlistId) return;

        const fetchPlaylistData = async () => {
            try {
                isLoading(true);
                const params = { id: playlistId };
                const endpoint = '/playlists';
                const apiResponse = await handleAPI({ params, endpoint, key });
                returnResponse(apiResponse?.data?.data);
            } catch (error) {
                // handle error
                return null;
            } finally {
                isLoading(false);
            }
        };

        fetchPlaylistData();
    }, [playlistId]);

    return null;
};

async function gethomepageData() {
    try {
        const params = { language: 'english' }
        const endpoint = '/modules'

        const apiResponse = await handleAPI({ params, endpoint, key })
        const data = {
            response: apiResponse?.data?.data,
            defaultPlaylistId: apiResponse?.data?.data?.playlists[0].id
        }
        return data
    } catch (error: any) {
        // console.error('Error fetching homepage data', error?.response?.data?.message)
        return null;
    }
}

async function getSongDetails(id: string) {
    try {
        if (id) {
            const endpoint = '/songs'
            const params = { id: id }
            const apiResponse = await handleAPI({ params, endpoint, key })
            return apiResponse?.data
        }
    } catch (error) {
        // console.error('Error fetching song details:', error);
        return null;
    }
}

export { gethomepageData, getSongDetails, PlaylistData }

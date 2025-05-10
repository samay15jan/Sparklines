import axios from 'axios'
import { useEffect, useState } from 'react'

interface HandleAPIParams {
  params: Record<string, string | number>
  endpoint: string
  key: string
}
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk4MTY4OWUwZTcwYjFkZTVlZjMxNjMiLCJpYXQiOjE3MzU2NTkxNzB9.m-LTy-jRwR0Z6nGGjZbSwL-Dou4UC-Y5B3l_yfP9T8s'
const baseUrl = 'https://sparklines-backend.vercel.app'

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

async function handleLogin(email: string, password: string): Promise<{ apiToken?: any; errors?: any }> {
  try {
    if (!email || !password) {
      return { errors: 'Fields cannot be empty' };
    }

    const response = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });

    const authToken = { Authorization: `Bearer ${response?.data?.data}` };

    const loggedInUser = await axios.get(`${baseUrl}/user/profile`, {
      headers: authToken,
    });

    const userId = loggedInUser?.data?.data?.userId;

    if (userId) {
      const userData = {
        userId,
        expiry: 'never',
      };
      const apiToken = await axios.post(`${baseUrl}/token/generate`, userData);
      return { apiToken };
    } else {
      return { errors: 'User ID not found in user profile response' };
    }

  } catch (error: any) {
    return { errors: error?.response?.data || error.message || 'Unknown error' };
  }
}

async function handleRegistration(email: string, password: string): Promise<{ apiToken?: any; errors?: any }> {
  try {
    if (!email || !password) {
      return { errors: 'Fields cannot be empty' };
    }

    const userData = { email, password };

    const registeredUser = await axios.post(
      `${baseUrl}/auth/register`,
      userData
    );

    if (!registeredUser?.data) {
      return { errors: 'Failed to create account' };
    }

    return await handleLogin(userData.email, userData.password)

  } catch (error: any) {
    return { errors: error?.response?.data || error.message || 'Unknown error' };
  }
}

export {
  gethomepageData,
  getSongDetails,
  PlaylistData,
  handleLogin,
  handleRegistration
}

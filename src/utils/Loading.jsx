import React from 'react'
import { LineWave } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='w-screen min-h-screen items-center flex justify-center'>
            <LineWave
                color="#23233f"
                visible={true}
                height="150"
                width="150"
                ariaLabel="line-wave-loading"
            />
        </div>
    )
}

export default Loading
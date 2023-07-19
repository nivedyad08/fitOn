import { Box } from '@chakra-ui/react'
import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

function AddedUserBadge({ user, handleFuntion }) {
    return (
        <div>
            <Box
                px={ 2 }
                py={ 1 }
                borderRadius="lg"
                m={ 1 }
                mb={ 2 }
                variant="solid"
                fontSize={ 12 }
                backgroundColor="green"
                color="white"
                cursor="pointer"
                onClick={ handleFuntion }
                style={ { display: "flex", maxWidth: "fit" } }
            >
                <span></span> { user.name }
                <FaRegTrashAlt style={ { marginTop: "2px", marginLeft: "2px" } } />
            </Box>
        </div>
    )
}

export default AddedUserBadge

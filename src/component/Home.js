import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import './Home.css'
import Table from './Table'
import ModalComponent from './ModalComponent'

const Home = () => {

    const [modal, setModal] = useState(false)

    const handleModal = () => {
        setModal((prevState) => !prevState)
    }

    return (
        <div>
            <Button
                className='create-table-button'
                value={modal}
                style={{ marginTop: '60px' }}
                onClick={handleModal}>Create Table</Button>
            {modal
                ?
                <ModalComponent modal={modal} />
                :
                <></>
            }
            <Table />
        </div>
    )
}

export default Home

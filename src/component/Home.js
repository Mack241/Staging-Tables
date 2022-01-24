import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import './Home.css'
import Table from './Table'
import ModalComponent from './ModalComponent'
import ModalContext from '../ModalContext'

const Home = () => {

    const [modal, setModal] = useState(false)

    const handleModal = () => {
        setModal((prevState) => !prevState)
    }

    return (
        <div>
            <div className='background'>
                <div className="title">
                    <h1>Staging Tables</h1>
                    <p className="description">Stage your tables in a smooth and flawless manner without having the hassle of coding them manually. Click on <b><i>Create Table</i></b> to continue.</p>
                </div>
            </div>
            <Button
                className='create-table-button'
                value={modal}
                style={{ marginTop: '60px' }}
                onClick={handleModal}>
                    Create Table
            </Button>
            {modal
                ?
                <ModalContext.Provider value={{ handleModal }}>
                    <ModalComponent modal={modal} />
                </ModalContext.Provider>
                :
                <></>
            }
            <Table />
        </div>
    )
}

export default Home

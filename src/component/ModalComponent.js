import React, { useContext, useEffect, useState } from 'react'
import { Box, Modal } from '@material-ui/core'
import { FormGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './ModalComponent.css'
import axios from 'axios'
import ModalContext from '../ModalContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalComponent = ({ modal }) => {

    const context = useContext(ModalContext)
    const { handleModal } = context

    const [close, setClose] = useState(true)
    const [count, setCount] = useState(0)
    const [type, setType] = useState([])
    const [colName, setColName] = useState([])
    const [tableName, setTableName] = useState('')

    const handleTypeChange = (e, index) => {
        type[index] = e.target.value
        setType([...type])
    }

    const removeColumnHandler = (index) => {
        const filteredRows = type.filter((i) => i.toLowerCase() !== type[index].toLowerCase())
        console.log(filteredRows)
    }

    const handleColName = (e, index) => {
        e.preventDefault()
        colName[index] = e.target.value
    }

    const addColumnHandler = () => {
        setCount(count + 1)
    }

    const handleClose = () => {
        if (modal) {
            setClose((prevState) => !prevState)
        }
        handleModal()
    }
 
    const submitHandler = async (e) => {
        e.preventDefault()
        setClose((prevState) => !prevState)
        handleModal()
        try {
            await axios.post('create_table', { type, count, colName, tableName })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setColName([...colName])
    }, [])

    const AddElement = ({ index }) =>
        <p>
            <TextField
                id="outlined-basic"
                label="Column Name"
                className="add-column"
                variant="outlined"
                value={colName[index]}
                onChange={(e) => handleColName(e, index)} />
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type[index]}
                label="Type"
                onChange={(e) => handleTypeChange(e, index)}
            >
                <MenuItem value="VARCHAR(100)">String</MenuItem>
                <MenuItem value="INTEGER">Numeric</MenuItem>
                <MenuItem value="TIMESTAMP">Date</MenuItem>
            </Select>
            <DeleteOutlinedIcon
                className="delete-column"
                onClick={(e) => removeColumnHandler(index)} />
        </p>

    return (
        <div>
            <Modal
                open={close}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={submitHandler}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Date" />
                            <TextField
                                id="outlined-basic"
                                label="Table Name"
                                className="table-name"
                                variant="outlined"
                                value={tableName}
                                onChange={(e) => setTableName(e.target.value)} 
                            />
                        </FormGroup>
                        <div className="vr"></div>
                        <div className="column-div-wrapper">
                            {[...Array(count)].map((_, i) =>
                                <AddElement key={i} index={i} />
                            )}
                        </div>
                        <Button
                            className='add-column-button'
                            onClick={addColumnHandler}
                        >
                            Add Column
                        </Button>
                        <Button className="submit-btn" type="submit">Submit</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalComponent

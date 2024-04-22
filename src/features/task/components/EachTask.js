import { Card, Col } from 'react-bootstrap';
import './eachTask.css';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Swal from 'sweetalert2';
import axios from 'axios';
import { fetchDeleteTaskAsync } from '../taskSlice';
import { useDispatch } from 'react-redux';
import { addTask } from '../taskSlice';



function EachTask({ title, status, description, createdOn, finishedBy, _id, }) {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(fetchDeleteTaskAsync(id));
            }
        });
    }

    let statusColor = ''
    if (status.toLowerCase() === 'pending') {
        statusColor = 'red'
    } else {
        statusColor = 'green'
    }
    return (
        <Col md={6} className='mb-4' >
            <Card className='each-task'>
                <Card.Body className='each-card-body'>
                    <div className='each-card-icons-wrapper'>
                        <MdEdit title='edit' style={{fill: '#54B435'}} onClick={() => dispatch(addTask({_id, title, status, description, createdOn, finishedBy}))}   />
                        <RiDeleteBin7Fill title='delete' onClick={() => { handleDelete(_id) }} style={{fill: '#E72929'}} />
                    </div>
                    <Card.Title className='fs-3' style={{ textTransform: 'capitalize' }}>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 fs-5" style={{ color: statusColor, textTransform: 'capitalize' }}>{status}</Card.Subtitle>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <div>Created on: {createdOn.split('T')[0]}</div>
                    <div>FinshedBy: {finishedBy.split('T')[0]}</div>

                </Card.Body>
            </Card>
        </Col>

    )
}

export default EachTask
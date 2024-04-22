import React, { useState, useEffect } from "react";
import { Container, Row,} from 'react-bootstrap'
import EachTask from "./EachTask";
// import axios from 'axios';
import { selectAllTasks, fetchAllTasksAsync } from '../taskSlice';
import { useDispatch, useSelector } from 'react-redux';


function Task() {
    const dispatch = useDispatch();
    const allTask = useSelector(selectAllTasks);

    useEffect(() => {
        dispatch(fetchAllTasksAsync())
    }, [])


    return (
        <>
            {
                allTask.length > 0 ?
                    <Container className='mt-5 mb-5'>
                        <Row>
                            {
                                allTask.map(item => {
                                    return <EachTask {...item} key={item._id} />
                                })
                            }
                        </Row>
                    </Container>
                    : <h1 className="text-center mt-5">No task is created</h1>
            }
        </>
    )
}

export default Task;
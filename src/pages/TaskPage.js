import React from "react";
import Task from "../features/task/components/Task";
import Menu from "../features/navbar/Menu";
import { Container, Col, Row } from 'react-bootstrap';
import AddTaskForm from "../features/task/components/AddTaskForm";
import { Navigate } from "react-router-dom";

function TaskPage(){

    const authToken = localStorage.getItem('authToken');

    if(!authToken){
        return <Navigate to="/login" replace={true} />
    }

    return (
        <>
            <Menu />
            <Container fluid>
                <Row style={{marginLeft: '0', marginRight: '0'}}>
                    <Col md={8}>
                        <Task />
                    </Col>
                    <Col md={4}>
                        <AddTaskForm />
                    </Col>
                </Row>
            </Container>
        </>
        
    )
}

export default TaskPage;
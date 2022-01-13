import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap' 
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'


const UserListScreen = ({history}) => {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('Are You Sure You Want To Delete This User?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loading
            ? (<Loader/>)
            : error ? 
                (<Message variant='secondary'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? (
                                        <i className='fas fa-check' style={{color: '#78c2ad'}}></i>
                                        ) : <i className='fas fa-times' style={{color: '#f3969a'}}></i> }
                                    </td>

                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='primary' className='btn-sm mx-3 my-1'>
                                                <i className='fas fa-user-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='secondary' className='btn-sm ml-3 my-1' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash-alt'></i>
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </div>
    )
}

export default UserListScreen
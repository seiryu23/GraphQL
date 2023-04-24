import { Tooltip, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { DELETE_TASK } from '../mutations/taskMutations'
import { useMutation } from '@apollo/client'
import { GET_TASKS } from '../queries/taskQueries'
import { useNavigate } from 'react-router-dom';

const DeleteTask = ({ id, userId }: { id: number, userId: number }) => {
    const [deleteTask] = useMutation<{deleteTask: number}>(DELETE_TASK);
    const navigate = useNavigate();

    const handleDeleteTask = async () => {
        try {
            await deleteTask({
                variables: {id},
                refetchQueries: [{query: GET_TASKS, variables: {userId}}]
            });
            alert('data deleted');
        } catch(err: any) {
            if (err.message === 'Unauthorized') {
                localStorage.removeItem('token');
                alert('token expired!! Move to the sign-in screen');
                navigate('/signin');
                return;
            }

            alert('Failed to delete data');
        }
    }

    return (
        <div>
            <Tooltip title='Delete'>
                <IconButton onClick={handleDeleteTask}>
                    <DeleteIcon color='action'/>
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default DeleteTask
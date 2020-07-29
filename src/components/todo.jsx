import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button, Modal, Card, CardContent, Input, FormControl } from '@material-ui/core';
import Db from '../constants/firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        justifyContent: 'center',
        alignItemCenter: 'center'
    },

}));

function Todo(props) {

    const [isOpen, setIsopen] = useState(false)
    const [input, setInput] = useState('');
    const { todo } = props;
    const classes = useStyles();

    const _renderModalBody = () =>
        (
            <Card className={classes.paper}>
                <CardContent>
                    <h4>Welcome to Edit Todo!</h4>
                    <form>
                        <FormControl>
                            <Input placeholder={todo.todo} value={input} onChange={(event) => setInput(event.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" onClick={(event) => updateTodo(event)}>Add TODO</Button>

                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        )

    //firebase Api to update the collection into firebase Db
    const updateTodo = (event) => {
        event.preventDefault();
        Db.collection('todos').doc(todo.id).set({
            todo: input,
            timeStamp: new Date().getTime()
        }, { merge: true })
        setIsopen(false);
    }

    return (
        <>
            <Modal
                style={{ alignItems: "center", justifyContent: "center" }}
                open={isOpen}
                onClose={() => setIsopen(false)}
            >
                {_renderModalBody()}

            </Modal>

            <List className={classes.root}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={todo.todo} />
                    <div style={{ display: 'flex', justifyContent: 'spacing', float: 'left' }}>
                        <Button color="primary"
                            variant="contained"
                            style={{ cursor: "pointer" }}
                            className={classes.button}
                            onClick={() => { setIsopen(true) }}>
                            Edit
                    </Button>
                        <Button variant="contained"
                            color="secondary"
                            className={classes.button}
                            style={{ cursor: "pointer" }} onClick={() => props.delteTodo()}>Delete</Button>
                    </div>
                </ListItem>
            </List>
        </>
    )
};

export default Todo;
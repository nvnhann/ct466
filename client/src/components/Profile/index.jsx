import React, {useState} from 'react';
import {Container, Grid, List, ListItem, ListItemText, Paper, Typography} from "@material-ui/core";
import {Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import Account from "./Account";
import AccountEdit from "./AccountEdit";

const useStyle = makeStyles(theme => ({
    root: {
        marginTop: '10rem',
    },
    listItem: {
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
    },
    selected: {
        backgroundColor: theme.palette.primary.main + '!important',
        color: '#fff'
    }
}))
export default function Index() {
    const classes = useStyle();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const list = [{
        index: 0,
        primary: 'Bảng điều khiển tài khoản',
    }, {
        index: 1,
        primary: 'Thông tin tài khoản',
    },
        {
            index: 2,
            primary: 'Sổ địa chỉ',
        }
    , {
        index: 3,
        primary: 'Đơn hàng của tôi',
    }, {
        index: 4,
        primary: 'Nhận xét của tôi',
    }, {
        index: 5,
        primary: 'Yêu thích',
    }, {
        index: 6,
        primary: 'Thông báo',
    }, {
        index: 7,
        primary: 'Đổi mật khẩu',
    }
    ]
    return (
        <Container className='mt-40'>
            <Grid container spacing={2}>
                <Grid item lg={3}>
                    <Paper elevation={4}>
                        <List component="nav">
                            {list.map(element => (
                                <div key={element.index}>
                                    <ListItem
                                        button
                                        classes={{root: classes.listItem, selected: classes.selected}}
                                        selected={selectedIndex === element.index}
                                        onClick={(event) => {
                                            handleListItemClick(event, element.index)
                                        }}
                                    >
                                        <ListItemText
                                            primary={<Typography href={element.path}>{element.primary}</Typography>}/>
                                    </ListItem>
                                </div>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item lg={9}>
                    {
                        selectedIndex === 0 && (<Account />)
                    }
                    {
                        selectedIndex === 1 && (<AccountEdit />)
                    }
                </Grid>
            </Grid>
        </Container>

    )
}
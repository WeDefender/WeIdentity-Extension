import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom'
import { List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: 320,
        height: 600
    },
    appBarGrid: {
        flexGrow: 1,
    },
    appBar:{
        backgroundColor: "#f2f3f4"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    }
    
}))

const LayoutWithRouter = withRouter(function Layout(props) {
    const classes = useStyles()
    const { children, location: { pathname } } = props
    const [open, setOpen] = React.useState(false)
    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setOpen(open)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    return (
        <div className={classes.root}>
            <div className={classes.appBarGrid}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} aria-label="menu" onClick={handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title} color="black">
                            weCertification
                        </Typography>
                        <Button>卡包</Button>
                    </Toolbar>

                </AppBar>
                
            </div>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                <List
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    className={classes.drawerPaper}
                    role="presentation"
                >
                    <ListItem button component={Link} to="/register"  selected={'/register' === pathname}>
                        <ListItemText primary={"注册"} />
                    </ListItem>
                    <ListItem button component={Link} to="/auth"  selected={'/auth' === pathname}>
                        <ListItemText primary={"授权"} />
                    </ListItem>
                    <ListItem button component={Link} to="/home"  selected={'/home' === pathname}>
                        <ListItemText primary={"主页"} />
                    </ListItem>
                </List>
            </Drawer>
            {/*
            
            <Button button component={Link} to="/register"  selected={'/register' === pathname}> 注册 </Button>
            <Button button component={Link} to="/auth"  selected={'/auth' === pathname}> 授权 </Button>
            <Button button component={Link} to="/home"  selected={'/home' === pathname}> 主页 </Button>
            */}
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        </div>
    )
})

export { LayoutWithRouter as Layout }

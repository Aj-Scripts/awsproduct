import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link,useNavigate} from  'react-router-dom'


const Navbar = () => {

  const token=localStorage.getItem('token')
  let deletetoken=()=>{
localStorage.removeItem('token')
navigate('/')

  }
  let navigate=useNavigate()

  return (
    <div>
       <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" style={{backgroundColor:"black"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            pRoDuCt_ApP
          </Typography>
          <Link to="/"><Button color="inherit" style={{color:"white"}}><strong>Home</strong></Button></Link>
          {token && (<>
           <Link to="/add"><Button color="inherit" style={{color:"white"}}><strong>add</strong></Button></Link>
                       <Button color="inherit" style={{color:"white"}} onClick={deletetoken}><strong>LogOut</strong></Button></>)}
           {!token &&(<>
          <Link to="/login"><Button color="inherit" style={{color:"white"}}><strong>Login</strong></Button></Link>
         </>)}
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar

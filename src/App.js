import React , { useState ,useEffect } from 'react';
import './App.css';
import { db ,auth } from './firebase';
import Post from './Post';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import ImageUpload from './ImageUpload';
//import './InstagramEmbed.js';
//import InstagramEmbed from 'react-instagram-embed';
//import InstagramEmbed from 'react-instagram-embed';


function App() {
  const [posts , setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn,setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user , setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if (authUser)
      {
        //Auther loggwd in
        console.log(authUser);
        setUser(authUser);
        
      }
      else 
      {
        //Error
        setUser(null);
      }
    })

    return () =>{
      //perform cleanup action 
      unsubscribe();
    }
  },[user,username])


  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })));
    })
  },[]);

  const signUp =(event)=>{
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
      return authUser.user.updateProfile({
      displayName : username
    })})
    .catch((error)=>alert(error.message))

    setOpen(false);
  }

  const signIn =(event)=>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password).catch((error)=>alert(error.message))

    setOpenSignIn(false)
  }
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className="App">
      
      <form className="app-signup">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
        <Box sx={style} className="app-signup-modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <center>
              <img className="modal-image" src="images/001-instagram.png" alt="Image not available"/>
            </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input 
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)} />
            <Input 
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
            <Input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
          </Typography>
          <Button onClick={signUp}>Sign Up</Button>
        </Box>
        
      </Modal>
      
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
        <Box sx={style} className="app-signup-modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <center>
              <img className="modal-image" src="images/001-instagram.png" alt="Image not available"/>
            </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input 
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
            <Input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
          </Typography>
          <Button onClick={signIn}>Sign In</Button>
        </Box>
        
      </Modal>
      </form>

      <div className="app_header">
        <img className="app_header_img" src="images/001-instagram.png" alt="Image not available"/>
        { user ?(<Button onClick={()=>auth.signOut()}>Log Out</Button>):(
            <div>
              <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={handleOpen}>Sign up</Button>
            </div> )
        }
        </div>
      <div className="app_posts">
        <div className="appLeft_posts">
        {
          posts.map(({id , post}) => (
            <Post key={id} username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
          ))
        }
        </div>
          
      </div>
      {
        user?.displayName ?
        <ImageUpload username={user.displayName} />:
        <h3>Sorry you need to login you upload</h3>
      }
    </div>
  );
}

export default App;

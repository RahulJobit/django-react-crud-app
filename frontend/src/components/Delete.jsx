import {React, useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AxiosInstance from './Axios'
import {useNavigate, useParams} from 'react-router-dom'

const Delete = () => {
   
   const MyParam = useParams()
   const MyId = MyParam.id


   const [myData, setMydata] = useState() 
   const [loading, setLoading] = useState(true) 

   const GetData = () => {
      AxiosInstance.get(`project/${MyId}`).then((res) =>{
       setMydata(res.data)
        console.log(res.data)
        setLoading(false)
   })

   }

    useEffect(() => {
       GetData();
    },[ ])


   const navigate = useNavigate()

   const submission = (data) => {

      AxiosInstance.delete( `project/${MyId}/`)
      .then((res) =>{
         navigate(`/`)
      })
   }

    return (
      <div>
      { loading ? <p>Loding Data....</p>:
      
      <div>


        <Box  sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
          
            <Typography sx={{marginLeft:'20px', color:'#fff'}}>

              Delete projects: {myData.name}

            </Typography>

        </Box>

        <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}> 

            <Box  sx={{display:'flex', justifyContent:'start', marginBottom:'40px'}}> 

                Are You Sure That You Want to Delete Project: {myData.name}
             
            </Box>


               <Box   sx={{width:'30%', marginTop:'40px', display:'flex', boxShadow:3 }}>
                  
                  <Button variant="contained" onClick={submission} sx={{width:'100%'}}>
                     Delete The Project
                  </Button>
               </Box>

         </Box>  

      </div>
      
       }
      
    </div>
  )
}

export default Delete

import {React, useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MyDatePickerField from './froms/MyDatePickerField'
import MyMultiLineField from './froms/MyMultilineField'
import MySelectField from './froms/MySelectField'
import MyTextField from './froms/MyTextField'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import AxiosInstance from './Axios'
import  Dayjs from 'dayjs' 
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MyMultiSelectField from './froms/MyMultiSelectField'

const Create = () => {

   const [projectmanager, setProjectmanager] = useState() 
   const [employees, setEmployees] = useState() 
   const [loading, setLoading] = useState(true) 
   
   const hardcoded_options = [

      {id:'', name:'None'},
      {id:'Open', name:'Open'},
      {id:'In Progress', name:'In Progress'},
      {id:'Completed', name:'Completed'},

   ]

   const GetData = () => {
      AxiosInstance.get(`projectmanager/`).then((res) =>{
        setProjectmanager(res.data)
        console.log(res.data)
   });

      AxiosInstance.get(`employees/`).then((res) =>{
        setEmployees(res.data)
        console.log(res.data)
        setLoading(false)
   })

   }

    useEffect(() => {
       GetData();
    },[ ])

   
   const navigate = useNavigate()
   const defaultValues = {

      name :'',
      comments :'',
      status :'',
      employees: [],
      start_date: null,
      end_date: null,
      
   }
     
   const schema = yup
  .object({
    name: yup.string().required('Name is a required field'),
    projectmanager: yup.string().required('Project manager is a required field'),
    status: yup.string().required('Status is a required field'),
    employees: yup.array().min(1, 'Pick at least one option from the select field').required('Employees is required'),
    comments: yup.string(),
    start_date: yup.date().required('Start date is a required field'),
    end_date: yup.date().required('End date is a required field').min(yup.ref('start_date'),'The end date can not be before the start date')
  })


   const {handleSubmit, control }= useForm({defaultValues:defaultValues, resolver: yupResolver(schema)})

   const submission = (data) => {

        const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
        const EndtDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")

        AxiosInstance.post( `project/`,{
           name: data.name,
           projectmanager: data.projectmanager,
           employees: data.employees,
           status: data.status,
           comments: data.comments,
           start_date: StartDate,
           end_date: EndtDate,

        })


          .then((res) =>{
              navigate(`/`)
          })
   }

    return (
      <div>

           { loading ? <p>Loding Data....</p>:
           <form onSubmit={handleSubmit(submission)}>

        <Box  sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
          
            <Typography sx={{marginLeft:'20px', color:'#fff'}}>

              Create Record

            </Typography>

        </Box>

        <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}> 


          <Box  sx={{display:'flex', justifyContent:'space-around', marginBottom:'40px'}}> 
              <MyTextField
                 label="Name"
                 name="name"
                 control={control}
                 placeholder="provide a project name"
                 width='30%'
              />

              <MyDatePickerField
                 label="Start date"
                 name="start_date"
                 control={control}
                 width='30%'
              />
                 <MyDatePickerField
                 label="End date"
                 name="end_date"
                 control={control}
                 width='30%'
              />
          </Box>


          <Box  sx={{display:'flex', justifyContent:'space-around'}}> 
              <MyMultiLineField
                 label="Comments"
                 name="comments"
                 control={control}
                 placeholder="provide project comments"
                 width='30%'
              />
                  
               <MySelectField
                  label="Status"
                  name="status"
                  control={control}
                  width='30%'
                  options={hardcoded_options}
               />
            
               <MySelectField
                  label="Project Manager"
                  name="projectmanager"
                  control={control}
                  width='30%'
                  options={projectmanager}
               />
         
              </Box>

              <Box  sx={{display:'flex', justifyContent:'space-around', margin:'40px'}}> 

                     <MyMultiSelectField
                         label="Employees"
                         name="employees"
                         control={control}
                         width='30%'
                         options={employees}
                     />
              </Box>

              <Box  sx={{display:'flex', justifyContent:'space-around', marginTop:'40px'}}> 

                  <Button variant="contained" type="submit" sx={{width:'30%'}}>
                        Submit
                  </Button>
                

              </Box>

      </Box>

      </form>
      }

    </div>
  )
}

export default Create

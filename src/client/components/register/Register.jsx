import { Box, Button, CardMedia, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../../../yupSchema/registerSchema";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
import './Register.css'

export default function Register() {
    const [message, setMessage] =  useState("");
    const [type, setType]= useState("succeess");

const [file, setFile] =useState(null);
const [imageUrl, setImageUrl] = useState(null)
const addImage =(event)=>{
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file))
    console.log("Image",file,event.target.value)
    setFile(file)
}

const resetMessage  =()=>{
    setMessage("")
}

    const initialValues = {
        school_name:"",
        email: "",
        owner_name:"",
        password:"",
        confirm_password:""
    }
    const Formik = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,
        onSubmit: (values) => {
            console.log("Register Formik values", values)
         
            if(file){
                const fd = new FormData();
                fd.append("image",file,  file.name);
                fd.append("school_name",values.school_name)
                fd.append("email",values.email)
                fd.append("owner_name",values.owner_name)
                fd.append("password", values.password)

                // --- START OF DEBUGGING CHANGES ---
                const specificEndpoint = "/school/register"; // The specific part for this call
                const finalApiUrl = `${baseUrl}${specificEndpoint}`;

                console.log("REGISTER.JSX: 'baseUrl' received from environment.js:", baseUrl);
                console.log("REGISTER.JSX: 'specificEndpoint' for this call:", specificEndpoint);
                console.log("REGISTER.JSX: Attempting API call to final URL:", finalApiUrl);


               
                axios.post(`https://school-management-backend-cu0q.onrender.com/api/school/register`,fd).then(resp=>{
                    console.log("Response register submit")
                    setMessage(resp.data.message);
                    setType("success")
                    setFile(null)
                    Formik.resetForm()
                }).catch(e=>{
                    setMessage(e.response.data.message);
                    setType("error")
                    console.log("Error in  register submit", e.response.data.message)
                })
            }else{
                setMessage("Please Provide An Image.");
                setType("error")
            }
            
        }
    })

    return (<Box component={'div'} sx={{background:"url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)", backgroundSize:"cover", minHeight:'100vh', p: { xs: 2, sm: 4 }, maxWidth: { xs: '100%', sm: 400, md: 500 }, width: '100%', margin: 'auto'}}>

<Box component={'div'} sx={{p: 0, maxWidth: '100%', width: '100%', margin: 'auto'}} > 
    {message && <CustomizedSnackbars reset={resetMessage} type={type} message={message}/>}
    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }} component={'div'}>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.2rem', sm: '1.7rem', md: '2.2rem' }, fontWeight: 700 }}>Register School</Typography>
    </Box>
    <Paper sx={{ p: { xs: 2, sm: 3 }, m: { xs: 1, sm: 2 }, width: '100%' }}>
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={Formik.handleSubmit}

        >

                <Box component={'div'} sx={{display:"flex", flexDirection:"row",
                    flexWrap:"wrap", alignItems:"center"}}>
                    <Typography style={{marginRight:"50px"}}  variant="h4">Add School Picture</Typography>
                    <TextField  sx={{ marginTop: "10px" }} id="filled-basic"
                    variant="outlined" name="file"
                    type="file"
                    onChange={(event)=>{
                        addImage(event)
                    }}/>

                    {file && <Box sx={{position:"relative"}} component={'div'}>
                           <CardMedia component={'img'} image={imageUrl} height={'240px'} />
                    </Box>}
                   
              
                </Box>
                

             <TextField fullWidth sx={{ marginTop: "10px" }} id="filled-basic"
                    label="School Name " variant="outlined" name="school_name"
                    value={Formik.values.school_name}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.touched.school_name && Formik.errors.school_name&& <p style={{ color: "red", textTransform: "capitalize" }}>
                    {Formik.errors.school_name}</p>}

                <TextField fullWidth sx={{ marginTop: "10px" }} id="outlined-basic"
                    label="Email" variant="outlined"
                    name="email"
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.touched.email && Formik.errors.email && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.email}</p>}


                <TextField fullWidth sx={{ marginTop: "10px" }} id="filled-basic"
                    label="Your Name " variant="outlined" name="owner_name"
                    value={Formik.values.owner_name}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.touched.owner_name && Formik.errors.owner_name&& <p style={{ color: "red", textTransform: "capitalize" }}>
                    {Formik.errors.owner_name}</p>}

                    <TextField fullWidth sx={{ marginTop: "10px" }} id="filled-basic"
                    label="Password"
                    type="password" variant="outlined" name="password"
                    value={Formik.values.password}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.touched.password && Formik.errors.password && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.password}</p>}

                <TextField fullWidth sx={{ marginTop: "10px" }} id="filled-basic"
                    label="Confirm Password"
                    type="password" variant="outlined" name="confirm_password"
                    value={Formik.values.confirm_password}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.touched.confirm_password && Formik.errors.confirm_password && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.confirm_password}</p>}

                <Box sx={{ marginTop: "10px" }} component={'div'}>
                    <Button type="submit" sx={{ marginRight: "10px" }} variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
        </Box>
    </Box>)
}

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { descriptionSchema } from "../../../yupSchema/contactSchema";
import Chatbot from '../home/Chatbot';
import axios from 'axios';

import ("./Contact.css")
export default function Contact() {


    const initialValues = {
        email: "",
        subject: "",
        description: ""
    }
    const Formik = useFormik({
        initialValues: initialValues,
        validationSchema: descriptionSchema,
        onSubmit: (values) => {
            console.log("Contact Formik values", values)
        }
    })

    return (<>

<Box component={'div'} sx={{background:"purple", p: { xs: 2, sm: 4 }, maxWidth: { xs: '100%', sm: 400, md: 500 }, width: '100%', margin: 'auto'}}>
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", background: "purple" }} component={'div'}>
            <Typography className="text-beautify hero-text" sx={{ fontSize: { xs: '1.2rem', sm: '1.7rem', md: '2.2rem' }, fontWeight: 700 }}>
                Contact
            </Typography>
        </Box>
        <Paper className="container-form-paper" sx={{ p: { xs: 2, sm: 3 }, m: { xs: 1, sm: 2 }, width: '100%', boxShadow: 3, transition: 'none', '&:hover': { boxShadow: 3 } }}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={Formik.handleSubmit}
            >
                <TextField fullWidth sx={{ marginTop: "10px" }} id="outlined-basic"
                    label="Email" variant="outlined"
                    name="email"
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.touched.email && Formik.errors.email && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.email}</p>}

                <TextField fullWidth sx={{ marginTop: "10px" }} id="filled-basic"
                    label="Subject" variant="outlined" name="subject"
                    value={Formik.values.subject}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.touched.subject && Formik.errors.subject && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.subject}</p>}

                <TextField fullWidth sx={{ marginTop: "10px" }} id="standard-basic"
                    label="Description" variant="outlined" name="description"
                    value={Formik.values.description}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    multiline
                    rows={4} />
                {Formik.touched.description && Formik.errors.description && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.description}</p>}

                <Box sx={{ marginTop: "10px" }} component={'div'}>
                    <Button type="submit" sx={{ marginRight: "10px" }} variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
        {/* AI Chatbot Section */}
        <Box sx={{ mt: 4 }}>
            <Chatbot />
        </Box>
    </Box>
    </>)
}
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Card,
  CardActions,
  CardMedia,
} from "@mui/material";
import NavBar from "../Navbar/Navbar";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import axios from "axios";
import "../../style.css";

const AddMedicine = () => {
  // const defaultImage = "C:\\fakepath\\Citrem-Plus.jpg";

  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    manufacturer: "",
    unitPrice: "",
    quantity: "",
    imageUrl: "",
  });

  // const [ImageUrl, setImageUrl] = useState(null);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // var formData = new FormData();
  // formData.append('Name', inputs.Name)
  // formData.append('Manufacturer',inputs.Manufacturer)
  // formData.append('UnitPrice',inputs.UnitPrice)
  // formData.append('Quantity',inputs.Quantity)
  // formData.append("ImageUrl",image);
  // medicines.append("Imageurl",ImageUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    const formdata = new FormData();
    formdata.append("formFile", file);
    formdata.append("fileName", filename);

    try {
      const res = await axios.post(
        "https://localhost:7156/api/Medicines/UploadFile",
        formdata
      );
      console.log("here");
      console.log(res);
      // if(res.data.status === 204){
      inputs.imageUrl = filename;
      await axios.post("https://localhost:7156/api/Medicines", inputs).then(
        (response) => {
          // console.log(response);
          // setInputs("");
          alert("Added Successfully");
          navigate("/");
        },
        (error) => {
          console.log(error);
        }
      );
      // }
      // else{
      //   alert("Something went wrong");
      // }
    } catch (ex) {
      console.log(ex);
    }
  };

  // useEffect(() => {
  //     if(ImageUrl){
  //         inputs.ImageUrl = image;
  //     }
  // },[ImageUrl])

  //   const [file, setFile] = useState("");
  //   function handleChange(e) {
  //     let url = URL.createObjectURL(e.target.files[0]);
  //     setFile(url);
  //     console.log(url);
  //   }

  // useEffect(() => {
  //   if (image) {
  //     console.log(image);
  //     // inputs.ImageUrl = image;
  //     // setImageUrl(URL.createObjectURL(image));
  //     alert("Image Uploaded Successfully");
  //   }
  // }, [image]);

  let onProfileUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const paperStyle = {
    padding: 20,
    margin: "10vh auto",
    width: 400,
  };

  const smallDev = {
    padding: 20,
    margin: "10vh auto",
    width: 450,
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [file, setFile] = useState("");
  const [file1, setFile1] = useState("");
  const [filename, setFilename] = useState("");

  const handleSave = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setFile1(url);
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <>
      <NavBar />
      <Grid align="center" className="gridMedStyle" style={{ marginTop: "8%" }}>
        <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
          <Grid align="center">
            <Avatar sx={{ width: 70, height: 70, backgroundColor: "#008080" }}>
              <MedicalServicesIcon
                sx={{ fontSize: 50, backgroundColor: "#008080" }}
              />
            </Avatar>
            <Typography variant="h6" style={{ marginTop: "5px" }}>
              Add Medicine
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              varient="outlined"
              label="Medicine Name"
              value={inputs.name}
              style={{ marginTop: "20px", marginRight: "5px" }}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="manufacturer"
              varient="outlined"
              label="Manufacturer"
              value={inputs.manufacturer}
              style={{ marginTop: "10px" }}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="unitPrice"
              varient="outlined"
              label="Unit Price"
              value={inputs.unitPrice}
              type="number"
              style={{ marginTop: "10px" }}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="quantity"
              varient="outlined"
              label="Quantity"
              type="number"
              value={inputs.quantity}
              style={{ marginTop: "10px" }}
              onChange={handleChange}
              fullWidth
              required
            />
            {/* <input
                            // name="ImageUrl"
                            accept="image/*"
                            type="file"
                            id="select-image"
                            // value={inputs.ImageUrl}
                            style={{display:"none"}}
                            onChange={onProfileUpload}
                        />
                        <label htmlFor="select-image" style={{width:"100%"}} >
                            <Button
                                variant="contained"
                                component="feSpecularLighting"
                                sx={{ mt: 1, "&:hover": { backgroundColor: '#FFFFFF', color: 'black', }, backgroundColor: '#FFFFFF', color: 'black' }}
                                fullWidth
                            >
                                Upload Image
                            </Button>
                        </label> */}

            <TextField
              style={{ marginTop: 15 }}
              name="file"
              // value={file}
              type="file"
              fullWidth
              label="Upload Image"
              InputLabelProps={{ shrink: true }}
              onChange={handleSave}
            />

            {file1.length > 0 && (
              <Card>
                <CardActions>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    image={file1}
                    title="Contemplative Reptile"
                  />
                </CardActions>
              </Card>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                "&:hover": { backgroundColor: "#008080", color: "white" },
                backgroundColor: "#008080",
              }}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default AddMedicine;

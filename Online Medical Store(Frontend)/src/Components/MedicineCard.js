import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const MedicineCard = (props) => {
  const context = useContext(UserContext);
  const imageUrl = "https://localhost:7156/wwwroot";

  return (
    <>
      {console.log(`${imageUrl}/${props.med.imageUrl}`)}
      <Card sx={{ maxWidth: 350, width: 350 }}>
        <h1>{props.med.image}</h1>
        <CardMedia
          sx={{ height: 250 }}
          image={`${imageUrl}/${props.med.imageUrl}`}

          //Random Images...
          // image="https://picsum.photos/200/300?grayscale"
          // title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.med.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manufacturer:- {props.med.manufacturer}
            <br />
            Unit Price:- {props.med.unitPrice}
            <br />
            Quantity-Available:- {props.med.quantity}
          </Typography>
        </CardContent>
        <CardActions>
          {context.user && context.user.type === "admin" && (
            <Button
              onClick={() => props.handleClickOpen(props.med.id)}
              variant="contained"
              sx={{
                "&:hover": { backgroundColor: "#008080", color: "white" },
                marginLeft: "3%",
                width: "30%",
                backgroundColor: "#008080",
                color: "white",
              }}
            >
              Edit
            </Button>
          )}
          {context.user && context.user.type === "admin" ? (
            <Button
              onClick={() => props.DeleteMedicine(props.med.id)}
              variant="contained"
              style={{
                "&:hover": { backgroundColor: "#ff4d4d", color: "white" },
                marginLeft: "40%",
                width: "30%",
                backgroundColor: "#ff4d4d",
                color: "white",
              }}
            >
              Delete
            </Button>
          ) : (
            <Button
              onClick={() => props.OrderMedicine(props.med)}
              variant="contained"
              sx={{
                "&:hover": { backgroundColor: "#008080", color: "white" },
                marginLeft: "35%",
                width: "30%",
                backgroundColor: "#008080",
                color: "white",
              }}
            >
              Order
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default MedicineCard;

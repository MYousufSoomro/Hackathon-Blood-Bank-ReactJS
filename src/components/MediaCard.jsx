import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ bloodGroup, email, name }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://plus.unsplash.com/premium_photo-1706191097438-a86238a40cfd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=250&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwOTk5OTc4NQ&ixlib=rb-4.0.3&q=80&w=250"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Blood Group: {bloodGroup} <br />
          Email: {email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          href={`mailto:${email}`}
          variant="contained"
          size="small"
        >
          Contact
        </Button>
      </CardActions>
    </Card>
  );
}

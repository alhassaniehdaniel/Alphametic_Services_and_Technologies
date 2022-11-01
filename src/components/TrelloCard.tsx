import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const TrelloCard = (props: any) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.text}
      </Typography>
    </Card>
  );
};

export default TrelloCard;

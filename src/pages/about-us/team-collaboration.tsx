import * as React from "react";

import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TeamCollaboration = () => {
  return (
    <Card sx={{ maxWidth: "84%", margin: "30px auto" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Team Collaboration:
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            To achieve a successful outcome, our team effectively collaborated
            by:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Conducting weekly stand-up meetings to discuss current progress and
            prioritize tasks.
          </Typography>
          <hr />
          <Typography variant="body2" color="text.secondary">
            Implementing a clear task management system that ensured everyone
            was aware of each other's work and deadlines.
          </Typography>
          <hr />
          <Typography variant="body2" color="text.secondary">
            Actively sharing knowledge and experience to assist each other in
            solving challenging problems and resolving conflicts.
          </Typography>
          <hr />
          <Typography variant="body2" color="text.secondary">
            Notably, open and honest communication was a vital aspect of our
            collaboration. We regularly shared ideas, questions, and issues,
            enabling us to adapt quickly to changes and achieve a successful
            outcome in the project.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default TeamCollaboration;

import { Typography } from "@mui/material";

export const SubtitleText = ({
  color,
  text,
}: {
  color: string;
  text: string;
}) => {
  return (
    <Typography variant="caption" align="left" color={color}>
      {text}
    </Typography>
  );
};

export const BodyText = ({ color, text }: { color: string; text: string }) => {
  return (
    <Typography variant="body2" align="left" color={color}>
      {text}
    </Typography>
  );
};

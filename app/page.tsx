import { Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Hello, Next.js with Material UI!
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </div>
  );
}

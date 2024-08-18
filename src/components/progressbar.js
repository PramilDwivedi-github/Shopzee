import LinearProgress from "@mui/material/LinearProgress";
import * as React from "react";

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    // <Box sx={{ width: "100%", height: 5 }}>
    //   <LinearProgress variant="determinate" value={progress} />
    // </Box>
    <div>
      <LinearProgress
        variant="determinate"
        color="secondary"
        value={progress}
      />
    </div>
  );
}

import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import DemoList from './DemoList'

function App() {
  return (
    <Box display="flex" flexDirection="column" height="100%" maxWidth="sm" >
      <Box p={1}>
        <Typography component="h1" variant="h4" align="center">
          <Link href="https://github.com/tanner-linsley/react-virtual" target="blank">React Virtual</Link> & <Link href="https://github.com/mui-org/material-ui" target="blank">Material UI</Link>
        </Typography>
      </Box>
      <Box p={1} flexGrow={1}>
        <DemoList />
      </Box>
      <Box p={1}>
        <Typography variant="body2" align="center">
          made with <span role="img" label="a laptop">💻</span> by <Link href="https://github.com/tchmnn" target="blank">tchmnn</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default App;

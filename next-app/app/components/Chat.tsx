import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

export default function FloatingActionButtons() {
    return (
        <Box
            sx={{
                "& > :not(style)": {
                    m: 0.8,
                    height: 30,
                    justifyContent: "right",
                },
            }}
        >
            <Fab variant="extended">Ask me Anything</Fab>
        </Box>
    );
}

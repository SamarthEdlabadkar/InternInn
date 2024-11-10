import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ActionAreaCard from "./Card";
import FloatingActionButtons from "./Chat";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

export default function Housing() {
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid size={3}>
                        <ActionAreaCard />
                    </Grid>
                    <Grid size={3}>
                        <ActionAreaCard />
                    </Grid>
                    <Grid size={3}>
                        <ActionAreaCard />
                    </Grid>
                    <Grid size={3}>
                        <ActionAreaCard />
                    </Grid>
                </Grid>
            </Box>
            <div className="justify-items-end">
                <FloatingActionButtons />
            </div>
        </>
    );
}

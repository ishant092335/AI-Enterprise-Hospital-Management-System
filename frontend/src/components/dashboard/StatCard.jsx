import { Card, CardContent, Typography, Box } from "@mui/material";

function StatCard({ title, value, icon, color }) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        height: 150,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body1" color="text.secondary">
              {title}
            </Typography>

            <Typography variant="h4" fontWeight="bold" mt={2}>
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: color,
              width: 60,
              height: 60,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;

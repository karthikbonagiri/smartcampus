import { Card, CardContent, Typography } from '@mui/material';

export default function StatsCard({ title, value }: { title: string; value: number }) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}
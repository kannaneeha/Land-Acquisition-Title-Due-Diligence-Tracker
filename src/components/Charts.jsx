import { Box, Card, CardContent, Typography } from '@mui/material';

const palette = ['#1455a3', '#1f8a70', '#ed6c02', '#c62828', '#6a4c93', '#607d8b'];

export function ChartCard({ title, children }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export function PieChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let cumulative = 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
      <svg viewBox="0 0 42 42" width="180" height="180" role="img" aria-label="Pie chart">
        {data.map((item, index) => {
          const value = (item.value / total) * 100;
          const dashArray = `${value} ${100 - value}`;
          const dashOffset = 25 - cumulative;
          cumulative += value;
          return (
            <circle
              key={item.label}
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke={palette[index % palette.length]}
              strokeWidth="9"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
            />
          );
        })}
        <circle cx="21" cy="21" r="10.8" fill="#fff" />
        <text x="21" y="20" textAnchor="middle" fontSize="4" fontWeight="700" fill="#14213d">{total}</text>
        <text x="21" y="24" textAnchor="middle" fontSize="2.6" fill="#5f6b7a">cases</text>
      </svg>
      <Box sx={{ minWidth: 180, flex: 1 }}>
        {data.map((item, index) => (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span className="status-dot" style={{ background: palette[index % palette.length] }} />
              <Typography variant="body2">{item.label}</Typography>
            </Box>
            <Typography variant="body2" fontWeight={700}>{item.value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function BarChart({ data }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      {data.map((item, index) => (
        <Box key={item.label}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2">{item.label}</Typography>
            <Typography variant="body2" fontWeight={700}>{item.value}</Typography>
          </Box>
          <Box sx={{ height: 12, borderRadius: 999, bgcolor: '#eef3f9', overflow: 'hidden' }}>
            <Box sx={{ width: `${(item.value / max) * 100}%`, height: '100%', bgcolor: palette[index % palette.length] }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function LineChart({ data }) {
  const width = 520;
  const height = 190;
  const padding = 28;
  const max = Math.max(...data.map((item) => item.value), 1);
  const points = data.map((item, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y = height - padding - (item.value / max) * (height - padding * 2);
    return { ...item, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="220" role="img" aria-label="Line chart">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#d8e2ee" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#d8e2ee" />
        <path d={path} fill="none" stroke="#1455a3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="5" fill="#1f8a70" />
            <text x={point.x} y={height - 8} textAnchor="middle" fontSize="11" fill="#5f6b7a">{point.label}</text>
            <text x={point.x} y={point.y - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#14213d">{point.value}</text>
          </g>
        ))}
      </svg>
    </Box>
  );
}

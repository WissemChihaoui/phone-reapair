import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { fNumber } from 'src/utils/format-number';
import { Chart,useChart, ChartLegends } from 'src/components/chart';
import { Box } from '@mui/material';
// ----------------------------------------------------------------------

export function StockChart({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.dark,
    theme.palette.error.dark,
    theme.palette.warning.main,
  ];

  const chartSeries = chart.series.map((item) => item.value);

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: { width: 0 },
    tooltip: {
      y: {
        formatter: (value) => fNumber(value),
        title: { formatter: (seriesName) => `${seriesName}` },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: {
            value: { formatter: (value) => fNumber(value) },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
            },
          },
        },
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other} sx={{height:'100%'}}>
      <CardHeader title={title} subheader={subheader} />
      <Box display='flex'>
          <ChartLegends
            labels={chartOptions?.labels}
            colors={chartOptions?.colors}
            sx={{ p: 3, justifyContent: 'center', display:'flex', flexDirection:'column' }}
          />
          <Chart
            type="donut"
            series={chartSeries}
            options={chartOptions}
            
            sx={{ mx: 'auto', my: 5 }}
          />
      </Box>
    </Card>
  );
}

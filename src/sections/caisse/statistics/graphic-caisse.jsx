import { Card, CardContent, CardHeader } from '@mui/material';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';
import { useCallback, useState } from 'react';

import { Chart, ChartSelect, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function GraphicCaisse({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const [selectedSeries, setSelectedSeries] = useState(chart.series[0].name);

  const currentSeries = chart.series.find((i) => i.name === selectedSeries) || { data: [] };
  const currentCategories = chart.categories[selectedSeries] || [];

  const chartColors = chart.colors ?? [
    hexAlpha(theme.palette.primary.dark, 0.8),
    theme.palette.warning.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    legend: { show: true },
    xaxis: { categories: currentCategories },
  });

  const handleChangeSeries = useCallback((newValue) => {
    setSelectedSeries(newValue);
  }, []);

  return (
    <Card {...other}>
      <CardHeader
        title={title || 'Graphique'}
        subheader={subheader || 'Data visualization'}
        action={
          <ChartSelect
            options={chart.series.map((item) => item.name)}
            value={selectedSeries}
            onChange={handleChangeSeries}
          />
        }
        sx={{ mb: 3 }}
      />

      <CardContent>
        <Chart
          key={selectedSeries} 
          type="line"
          series={[currentSeries]}
          options={chartOptions}
          height={320}
        />
      </CardContent>
    </Card>
  );
}

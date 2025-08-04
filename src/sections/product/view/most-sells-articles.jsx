import React from 'react';
import dayjs from 'dayjs';

import { Box, Card, Link, Avatar, CardHeader, IconButton } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { _ecommerceLatestProducts } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useDateRangePicker, CustomDateRangePicker } from 'src/components/custom-date-range-picker';

export default function MostSellsArticles() {
  const rangeCalendarPicker = useDateRangePicker(dayjs(new Date('2024/08/08')), null);
  return (
    <>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={rangeCalendarPicker.onOpen} name="period" label="Périod">
              <Iconify icon="mdi:calendar-outline" />
            </IconButton>
          }
          title="Les article plus vendus"
        />

        <Scrollbar sx={{ minHeight: 384 }}>
          <Box
            sx={{
              p: 3,
              gap: 3,
              minWidth: 360,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {_ecommerceLatestProducts.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </Box>
        </Scrollbar>
      </Card>
      <CustomDateRangePicker
        variant="calendar"
        open={rangeCalendarPicker.open}
        startDate={rangeCalendarPicker.startDate}
        endDate={rangeCalendarPicker.endDate}
        onChangeStartDate={rangeCalendarPicker.onChangeStartDate}
        onChangeEndDate={rangeCalendarPicker.onChangeEndDate}
        onClose={rangeCalendarPicker.onClose}
        error={rangeCalendarPicker.error}
      />
    </>
  );
}
function Item({ item, sx }) {
  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
    >
      <Avatar
        variant="rounded"
        alt={item.name}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <Box
        sx={{ gap: 0.5, minWidth: 0, display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}
      >
        <Link noWrap sx={{ color: 'text.primary', typography: 'subtitle2' }}>
          {item.name}
        </Link>

        <Box sx={{ gap: 0.5, display: 'flex', typography: 'body2', color: 'text.secondary' }}>
          {!!item.priceSale && (
            <Box component="span" sx={{ textDecoration: 'line-through' }}>
              {fCurrency(item.priceSale)}
            </Box>
          )}

          <Box component="span" sx={{ color: item.priceSale ? 'error.main' : 'inherit' }}>
            {fCurrency(item.price)}
          </Box>
        </Box>
      </Box>
      {32}
    </Box>
  );
}

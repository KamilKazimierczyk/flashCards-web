import { Grid } from '@mui/material';
import React from 'react';
import { languages } from '../config';
import FilterItem from './FilterItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterComponent({
  setSort,
  setFilter,
  currentSort,
  filtersObject,
}) {
  const sortingObject = [
    {
      name: 'Wybierz sortowanie',
      value: 'Wybierz sortowanie',
    },
    {
      name: 'Najpopularniejsze',
      value: '-favouritesCount',
    },
    {
      name: 'Najmniej popularne',
      value: '+favouritesCount',
    },
    {
      name: 'Od A do Z',
      value: '+name',
    },
    {
      name: 'Od Z do A',
      value: '-name',
    },
  ];

  const filters = [
    {
      name: 'Translated from',
      options: ['Wybierz język', ...languages],
      currentValue: filtersObject.from,
      onChange: (e) => {
        setFilter((prev) => ({ ...prev, from: e.target.value }));
      },
    },
    {
      name: 'Translated to',
      options: ['Wybierz język', ...languages],
      currentValue: filtersObject.to,
      onChange: (e) => {
        setFilter((prev) => ({ ...prev, to: e.target.value }));
      },
    },
  ];

  const changeSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <Grid container spacing={1}>
      {filters.map((filter) => (
        <Grid item xs={12} md="auto" key={filter.name}>
          <FilterItem
            value={filter.currentValue}
            options={filter.options}
            name={filter.name}
            setValue={filter.onChange}
          />
        </Grid>
      ))}
      <Grid item xs={12} md="auto" sx={{ ml: 'auto' }}>
        <FormControl sx={{ minWidth: '200px' }}>
          <InputLabel id="demo-simple-select-label">Sortowanie</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentSort}
            label="Age"
            onChange={changeSort}
          >
            {sortingObject.map((sort) => (
              <MenuItem value={sort.value} key={sort.value}>
                {sort.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

import { createSelector } from 'reselect';

// Inputs selectors
const selectDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
    [selectDirectory],
    (directory) => directory.sections
);


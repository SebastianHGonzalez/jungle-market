import React, { useMemo } from 'react';
import {
  shape, arrayOf, bool, string, func, oneOfType,
} from 'prop-types';
import SSelect from 'react-select';
import CSelect from 'react-select/creatable';
import { find, sortBy, flatMap } from 'lodash';
import styled, { withTheme } from 'styled-components';

import { InputWrapper, Input } from 'components/common/input/TextInput';
import Chevron from 'components/common/icons/Chevron';
import I18n from 'components/common/i18n';
import Loader from 'components/common/icons/Loader';

type Value = any | any[];

interface Props<T> {
  disabled?: boolean;
  loading?: boolean;
  theme?: any;
  sort?: boolean;
  options?: T[];
  value?: T;
  onChange?: (newValue: Value) => void;
  getOptionLabel?: (o: T) => any;
  readOnly?: boolean;
  creatable?: boolean;
  getOptionValue?: (o: T) => Value;
  placeholder?: any;
  isMulti?: boolean;
}

interface SelectProps<T> extends Props<T> {
  formatCreateLabel: (value: string) => JSX.Element;
  isLoading: boolean;
  isDisabled: boolean;
  noOptionsMessage: React.FC;
  loadingMessage: React.FC;
  components: any;
  styles: any;
}

function flatOption(option) {
  return Array.isArray(option.options) ? flatOptions(option.options) : option;
}

function flatOptions(options) {
  return flatMap(options, flatOption);
}

function sortOption(option) {
  return Array.isArray(option.options)
    ? { ...option, options: sortOptions(option.options) }
    : option;
}

function sortOptions(options) {
  return sortBy(options.map(sortOption), 'label');
}

function mapSingleValueToOption(value, options, getOptionValue) {
  return typeof value === 'object'
    ? value
    : find(options, (option) => getOptionValue(option) === value) || {
      value,
      label: value,
    };
}

function mapValueToOption(value, options, getOptionValue) {
  return Array.isArray(value)
    ? value.map((singleValue) => mapSingleValueToOption(singleValue, options, getOptionValue))
    : mapSingleValueToOption(value, options, getOptionValue);
}

function MappingSelect<T>({
  value,
  options,
  getOptionLabel,
  getOptionValue,
  ...props
}: Props<T>) {
  const mappedValue = useMemo(
    () => value && mapValueToOption(value, options, getOptionValue),
    [value, options, getOptionValue],
  );

  return (
    <StyledSelect
      value={mappedValue}
      options={options}
      getOptionValue={getOptionValue as any}
      getOptionLabel={getOptionLabel as any}
      {...props}
    />
  );
}

const customStyles = {
  container: (provided) => ({
    ...provided,
    minWidth: '12rem',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 1100,
  }),
};

function NoOptionsMessage() {
  return <I18n id="no.options" />;
}

function LoadingMessage() {
  return <I18n id="loading" />;
}

function StyledSelect<T>({
  disabled,
  loading,
  getOptionValue,
  getOptionLabel,
  theme: {
    primary, primary75, primary50, primary25,
  },
  ...props
}: Props<T>) {
  return (
    <SortingSelect
      getOptionValue={getOptionValue as any}
      getOptionLabel={getOptionLabel as any}
      formatCreateLabel={formatCreateLabel}
      isDisabled={disabled || false}
      isLoading={loading || false}
      noOptionsMessage={NoOptionsMessage}
      loadingMessage={LoadingMessage}
      components={{
        LoadingIndicator: Loader,
        DropdownIndicator: Chevron,
      }}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary,
          primary75,
          primary50,
          primary25,
        },
      })}
      {...props}
    />
  );
}

function formatCreateLabel(value) {
  return (
    <>
      <I18n id="add" />
      {': '}
      {value}
    </>
  );
}

function SortingSelect<T>({
  sort,
  options,
  getOptionValue,
  getOptionLabel,

  ...props
}: SelectProps<T>) {
  const sortedOptions = useMemo(() => (sort ? sortOptions(options) : options), [
    options,
    sort,
  ]);

  return (
    <SwitchingSelect
      {...props}
      options={sortedOptions}
      getOptionValue={getOptionValue as any}
      getOptionLabel={getOptionLabel as any}
    />
  );
}

const ReadOnlySelectWrapper = styled(Input).attrs({ as: 'span' })``;

function ReadOnlySelect<T>({
  value,
  getOptionLabel,
  isLoading,
  ...props
}: SelectProps<T>) {
  return (
    <InputWrapper>
      <ReadOnlySelectWrapper>
        {[value]
          .flat()
          .map((child) => (getOptionLabel ? getOptionLabel(child) : child))}
      </ReadOnlySelectWrapper>
      {isLoading && <Loader />}
    </InputWrapper>
  );
}

function SwitchingSelect<T>({
  readOnly,
  creatable,

  getOptionValue,
  getOptionLabel,
  ...props
}: Props<T>) {
  // eslint-disable-next-line no-nested-ternary
  const SelectComponent = readOnly
    ? ReadOnlySelect
    : creatable
      ? CSelect
      : SSelect as any;

  return (
    <SelectComponent
      getOptionValue={getOptionValue as any}
      getOptionLabel={getOptionLabel as any}
      {...props}
    />
  );
}

export default withTheme(MappingSelect);

const propTypes = {
  disabled: bool,
  loading: bool,
  theme: shape({}),
  sort: bool,
  options: arrayOf(shape({})),
  value: oneOfType([shape({}), arrayOf(shape({}))]),
  getOptionLabel: func,
  readOnly: bool,
  creatable: bool,
  getOptionValue: func,
  placeholder: string,
  isMulti: bool,
};

const defaultProps = {
  disabled: false,
  loading: false,
  theme: undefined,
  sort: false,
  options: [],
  getOptionLabel: ({ label }) => label,
  getOptionValue: ({ value }) => value,
  readOnly: false,
  creatable: false,
  value: undefined,
  placeholder: '',
  isMulti: false,
};

StyledSelect.propTypes = propTypes;
StyledSelect.defaultProps = defaultProps;
SortingSelect.propTypes = propTypes;
SortingSelect.defaultProps = defaultProps;
ReadOnlySelect.propTypes = propTypes;
ReadOnlySelect.defaultProps = defaultProps;
SwitchingSelect.propTypes = propTypes;
SwitchingSelect.defaultProps = defaultProps;
MappingSelect.propTypes = propTypes;
MappingSelect.defaultProps = defaultProps;

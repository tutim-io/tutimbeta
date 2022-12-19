import { FieldComponents, InputType } from '@tutimbeta/types';
import { SelectField } from './SelectField';
import { TextField } from './TextField';

export const defaultFields: FieldComponents = {
  [InputType.Select]: SelectField,
  [InputType.Text]: TextField,
};

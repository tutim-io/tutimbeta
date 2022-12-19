import React from 'react';
import { useForm } from '@tutimbeta/headless';
import { FormElement } from '@tutimbeta/fields';
import config from './basic.json';

export const DesignSystem = (): JSX.Element => {
  const { handleSubmit, fieldsByKey } = useForm(config);

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return <FormElement onSubmit={handleSubmit(onSubmit)} fieldsByKey={fieldsByKey} />;
};

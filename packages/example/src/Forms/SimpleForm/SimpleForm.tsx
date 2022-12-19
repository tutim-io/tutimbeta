import React from 'react';
import { Form } from '@tutimbeta/fields';

const config = {
  fields: [
    {
      key: 'firstName',
      label: 'First Name',
      inputType: 'text',
    },
    {
      key: 'lastName',
      label: 'Last Name',
      inputType: 'text',
    },
  ],
};

export const SimpleForm = (): JSX.Element => {
  return <Form onSubmit={console.log} config={config} />;
};

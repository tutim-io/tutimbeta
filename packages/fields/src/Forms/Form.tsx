import React from 'react';
import { useForm } from '@tutimbeta/headless';
import { OnSubmit, PartialFormConfig, UseFormReturn } from '@tutimbeta/types';
import { FormElement } from './FormElement';
import { Button } from '../Buttons';

interface FormProps {
  onSubmit: OnSubmit;
  config: PartialFormConfig;
  initialValues?: Record<string, any>;
}
interface FormViewProps {
  form: UseFormReturn;
  onSubmit: OnSubmit;
}

const SuccessfulSubmission = ({ reset }: { reset: () => void }) => {
  const onClick = () => reset();

  return (
    <div>
      <p>Submitted Successfully</p>
      <Button label="Back to form" onClick={onClick} />
    </div>
  );
};

export const FormView = ({ form, onSubmit }: FormViewProps): JSX.Element => {
  const { fieldsByKey, handleSubmit, formState, reset, layout, logic, schema } = form;
  const { isSubmitSuccessful } = formState;
  const onControlledSubmit = handleSubmit((data) => onSubmit({ data, schema }));

  if (isSubmitSuccessful && logic.submissionPage) return <SuccessfulSubmission reset={reset} />;
  return <FormElement onSubmit={onControlledSubmit} layout={layout} fieldsByKey={fieldsByKey} />;
};

/**
 * fully managed TutimForm.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 *
 * @param props - form configuration and actions.
 *
 * @example
 * ```tsx
 * import { FormProvider } from '@tutimbeta/headless';
 * import { Form, defaultFields } from '@tutimbeta/fields';
 *
 * const config = {
 *   fields: [
 *     { key: 'firstName', label: 'First Name', inputType: 'text' },
 *     { key: 'lastName', label: 'Last Name', inputType: 'text' },
 *   ],
 * };
 *
 * export const TutimForm = (): JSX.Element => {
 *   return <Form onSubmit={console.log} config={config} />;
 * };
 *
 * const App = (): JSX.Element => {
 *   return (
 *     <div className="App">
 *       <FormProvider fieldComponents={defaultFields}>
 *         <TutimForm />
 *       </FormProvider>
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 */
export const Form = ({ config, onSubmit, initialValues }: FormProps): JSX.Element => {
  const form = useForm(config);
  if (form.error) return <p>Error in loading form</p>;
  form.useFormInit(async () => initialValues);

  return <FormView form={form} onSubmit={onSubmit} />;
};

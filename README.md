# ๐ README

[![Tutim.io logo](https://res.cloudinary.com/tutim/image/upload/v1671445328/logo-png\_rjs63o.png)](https://tutim.io)

## **Form infrastructure for product teams**

Headless forms module to create web-app powerful forms in minutes.

[![MIT License](https://img.shields.io/github/license/tutim-io/tutim)](https://github.com/tutim-io/tutim/blob/main/LICENSE) [![Number of GitHub stars](https://img.shields.io/github/stars/tutim-io/tutim?logo=github)](https://github.com/tutim-io/tutim/stargazers) [![Discord is Live](https://img.shields.io/badge/Discord-Live-green?logo=discord\&logoColor=%23fff)](https://discord.tutim.io) [![Docs are updated](https://img.shields.io/badge/docs-updated-green?color=blue)](https://docs.tutim.io) [![Product Hunt](https://img.shields.io/badge/Product%20Hunt-Launch%20soon-orange?logo=producthunt\&logoColor=%23fff)](https://www.producthunt.com/@leetwito)

***

### ๐ Why Tutim?

Building forms in apps is complicated.

At first, it seems like just throwing a few input fields, but in reality, it's just the beginning.

Tutim gives you your own in-house form builder that's fully integrated with your component library and design system. Everybody on your team can create, edit, and publish forms and surveys in your app regardless of their technical background.

This repo is 100% free, and will always remain.

### โจ Features

* ๐ **Headless:** Default design system that can be replaced with yours
* ๐ **Rich form:** Save draft, wizard, conditional branching, and more are available out-of-the-box
* ๐ **Performant:** Best practices are implemented. Never worry about delays
* ๐ ๏ธ **No-Code Builder:** Let PMs and designers create and change forms. Stick with React for styling and embedding
* ๐จโ๐ป **Built-in Analytics:** Opening rate, drop-offs, conversions. privacy-first `(coming soon)`
* ๐ฆ **Templates:** Onboarding, personal details, feedback from our gallery`(coming soon)`

### ๐ Getting Started

[**Explore the docs ยป**](https://docs.tutim.io)

Create your first form in 2 minutes, by following these steps:

1\. Install tutim React package:

```bash
yarn add @tutimbeta/headless @tutimbeta/fields @tutimbeta/types
```

```bash
npm install @tutimbeta/headless @tutimbeta/fields @tutimbeta/types
```

2\. Create your first form schema with [Tutim Form Builder](https://builder.tutim.io/), or by creating the form JSON schema yourself

3\. Render the form:

```jsx
import { Form, defaultFields } from "@tutimbeta/fields";
import { FormProvider } from "@tutimbeta/headless";

const config = {
  // Use https://tutim.io to create and manage rich schemas with no-code
  fields: [
    { key: "firstName", label: "First Name", inputType: "text" },
    { key: "lastName", label: "Last Name", inputType: "text" },
  ],
};

const TutimForm = () => {
  return <Form onSubmit={console.log} config={config} />;
};

const App = () => {
  return (
    <div className="App">
      <FormProvider fieldComponents={defaultFields}>
        <TutimForm />
      </FormProvider>
    </div>
  );
};

export default App;
```

### โญ Example

Play with Tutim and create a form in 2 minutes

![Form output example](https://res.cloudinary.com/tutim/image/upload/v1671445339/example-signup-form\_zh0af4.png)

Save this JSON file as 'signup-schema.json' (built by [Tutim form builder](https://builder.tutim.io/))

```json
{
  "fields": [
    {
      "key": "email",
      "label": "Email",
      "inputType": "text",
      "isRequired": true,
      "validations": {
        "pattern": {
          "value": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
          "message": "Must be a valid email"
        }
      }
    },
    { "key": "first_name", "label": "First Name", "inputType": "text" },
    { "key": "last_name", "label": "Last Name", "inputType": "text" }
  ]
}
```

#### [TutimForm](https://docs.tutim.io/react-sdk/tutim-form)

`Form` is a component that provides a simple interface for defining the fields and form behavior, while handling the infrastructure and user interface for you.

```jsx
import { FormProvider } from "@tutimbeta/headless";
import { Form, defaultFields } from "@tutimbeta/fields";
import signupSchema from "./signup-schema.json";

const TutimForm = () => {
  return <Form onSubmit={console.log} config={signupSchema} />;
};

const App = () => {
  return (
    <div className="App">
      <FormProvider fieldComponents={defaultFields}>
        <TutimForm />
      </FormProvider>
    </div>
  );
};

export default App;
```

#### [ControlledForm](https://docs.tutim.io/react-sdk/controlled-form)

`ControlledForm` is a component with control over the form logic, while leaving the form infrastructure and user interface to be handled for you. It provides a set of tools for managing the form data and form submission, and a `FormView` component for rendering the form fields and submission button.

```jsx
import { Form, defaultFields } from "@tutim/fields";
import { FormProvider } from "@tutim/headless";

const config = {
  fields: [
    { key: "firstName", label: "First Name", inputType: "text" },
    { key: "lastName", label: "Last Name", inputType: "text" },
  ],
};

const TutimForm = () => {
  return <Form onSubmit={console.log} config={config} />;
};

const App = () => {
  return (
    <div className="App">
      <FormProvider fieldComponents={defaultFields}>
        <TutimForm />
      </FormProvider>
    </div>
  );
};

export default App;
```

#### [HeadlessForm](https://docs.tutim.io/react-sdk/headless-form)

`HeadlessForm` is a component with complete control over the form logic and design. It provides a set of tools for managing the form infrastructure, such as handling form submissions and managing the form data, while leaving the form logic and design up to you.

```jsx
import { FormProvider, useForm } from "@tutim/headless";
import { Field, FieldComponents, InputType } from "@tutim/types";

const config = {
  fields: [
    {
      key: "firstName",
      label: "First Name",
      inputType: "text",
      defaultValue: "first",
    },
    { key: "lastName", label: "Last Name", inputType: "text" },
  ],
};

const HeadlessForm = () => {
  const { fieldsByKey, watch, handleSubmit } = useForm(config);
  const name = watch("firstName");

  return (
    <form
      onSubmit={handleSubmit(console.log)}
      style={{ display: "flex", flexDirection: "column", gap: "5px" }}
    >
      {fieldsByKey["firstName"]}
      {name === "first" && fieldsByKey["lastName"]}
      <input type="submit" />
    </form>
  );
};

const fieldComponents = {
  [InputType.Text]: ({ inputProps }) => <input {...inputProps} />,
};

const App = () => {
  return (
    <div className="App">
      <FormProvider fieldComponents={fieldComponents}>
        <HeadlessForm />
      </FormProvider>
    </div>
  );
};

export default App;
```

#### [CustomField](https://docs.tutim.io/react-sdk/customfield)

BYOF - Bring Your Own Field. Use `Field` type to register any type of field. Can be used on `FormProvider` level for global inputs or withing `FieldConfig` for local use cases

`CustomField` is a component that allows you to define custom form fields that can be used in your react application. You can use it to render any type of form field that you want, based on the `inputType` specified in the field configuration.

`CustomField` can be used either globally, by specifying it in the `fieldComponents` object passed to the `FormProvider` component, or locally, by specifying the `Field` prop in the field configuration when creating a form.

```tsx
import { Field, FieldConfig } from "@tutim/types";

export const CustomField: Field = ({ inputProps, fieldConfig }) => {
  const { value, onChange } = inputProps;
  const onClick = () => onChange(value + 2);
  return (
    <button type="button" onClick={onClick}>
      {fieldConfig.label}: {value}
    </button>
  );
};

export const customFieldConfig: FieldConfig = {
  key: "clicker",
  label: "Click Me",
  inputType: "custom",
  defaultValue: 0,
  Field: CustomField,
};
```

#### [FormProvider](https://docs.tutim.io/react-sdk/formprovider)

`FormProvider` is a component that allows you to define the form fields that you want to use in your react application. It provides a way to specify the field components that will be used to render the form fields, and allows you to use either the default field components provided by the `@tutim/fields` library, or your own custom field components.

```tsx
import { FormProvider } from "@tutimbeta/headless";
import { defaultFields, Form } from "@tutimbeta/fields";
import { Field, FieldComponents, InputType } from "@tutimbeta/types";

export const CustomField: Field = ({ inputProps, fieldConfig }) => {
  const { value, onChange } = inputProps;
  const onClick = () => onChange(value + 2);
  return (
    <button type="button" onClick={onClick}>
      {fieldConfig.label}: {value}
    </button>
  );
};

const fieldComponents: FieldComponents = {
  ...defaultFields, // optional built in input fields based on MUI
  [InputType.Text]: ({ inputProps }) => <input {...inputProps} />,
  "custom-field": (fieldProps) => <CustomField {...fieldProps} />,
  // add any type of input and reference it by 'inputType'
};

const App = (): JSX.Element => {
  return (
    <div className="App">
      <FormProvider fieldComponents={fieldComponents}>
        <Form onSubmit={console.log} config={{ fields: [{ key: "field1" }] }} />
      </FormProvider>
    </div>
  );
};

export default App;
```

### ๐ Forms

Tutim provides all forms solutions. Through code or drag & drop interface.

**๐ Inputs**

* [x] All basic (Text, Select, Checkbox, Date...)
* [x] Array & Multi fields
* [x] Nested and deep nested support
* [ ] Rich input library (coming soon)

**๐ Design & Layout**

* [x] Simple form layout (one pager)
* [x] Layout and grouping control
* [ ] Wizard multi steps (coming soon)
* [ ] DnD rich builder

**๐ Portal**

* [x] Simple form builder
* [ ] Drag & Drop form builder
* [ ] Templates library
* [ ] Conditional branching

**โ๏ธ Cloud (**[**closed beta, request early access**](https://discord.tutim.io)**)**

* [x] Manage and serve schemas
* [x] Hosted forms
* [ ] Backend support
* [ ] 3rd Party integrations

### ๐คต Need Help?

We are more than happy to help you.

If you are getting any errors, facing problems, or need a new feature while working on this project -

[Open an issue](https://github.com/tutim-io/tutim/issues/new/choose) or join our [Discord server](https://discord.tutim.io) and ask for help.

### ๐ Links

* [Home page](https://tutim.io)
* [Builder](https://builder.tutim.io)
* [Discord community](https://discord.tutim.io)
* [Twitter](https://twitter.com/Tutim\_io)
* [Contribution Guidelines](https://tutim.io/contribute)
* [Docs](https://docs.tutim.io)
* [Support on Product Hunt (follow, we're launching soon!)](https://www.producthunt.com/@leetwito)

### ๐ช By the community, for the community

![](https://contrib.rocks/image?repo=tutim-io/tutim)

Powered by [Tutim.io](https://tutim.io)

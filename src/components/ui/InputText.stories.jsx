import React from 'react';
import InputText from './InputText';

export default {
  title: 'Components/Forms/InputText',
  component: InputText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Teks placeholder untuk field input',
    },
    value: {
      control: 'text',
      description: 'Nilai input',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function ketika nilai input berubah',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
      description: 'Tipe field input',
      defaultValue: 'text',
    },
  },
  tags: ['autodocs'],
};

const Template = (args) => <InputText {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Enter your text',
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  label: 'Your name',
  value: 'Ibnu Topan',
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  label: 'Enter your email',
  type: 'email',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  label: 'Enter your password',
  type: 'password',
};

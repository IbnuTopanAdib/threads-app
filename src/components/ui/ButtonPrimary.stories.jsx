import React from 'react';
import ButtonPrimary from './ButtonPrimary';

export default {
  title: 'Components/Buttons/ButtonPrimary',
  component: ButtonPrimary,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    label: {
      control: 'text',
      description: 'Teks yang ditampilkan pada tombol',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function ketika tombol diklik',
    },
  },
  tags: ['autodocs'],
};

const Template = (args) => <ButtonPrimary {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Click Me',
};

export const LongText = Template.bind({});
LongText.args = {
  label: 'ButtonPrimary dengan label yang lebih panjang untuk menguji responsivitas tombol',
};


export const WithClickHandler = Template.bind({});
WithClickHandler.args = {
  label: 'Clickable Button',
  onClick: () => alert('Tombol diklik!'),
};


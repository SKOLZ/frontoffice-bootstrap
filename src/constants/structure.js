import moment from 'moment';

import InputLabel from '~components/InputLabel';
import Select from '~components/Select';
import Datepicker from '~components/Datepicker';

export const actions = ['INDEX', 'SHOW', 'EDIT', 'DESTROY', 'CREATE'].reduce(
  (acc, value) => ({ ...acc, [value]: value }),
  {}
);

const only = (...params) => params.reduce((acc, value) => ({ ...acc, [value]: true }), {});

export const defaultInputs = {
  text: InputLabel,
  number: InputLabel,
  email: InputLabel,
  select: Select,
  date: Datepicker
};

export default {
  appName: 'Frontoffice Test',
  favicon: 'https://cdn-images-1.medium.com/fit/c/200/200/1*RIlH4dGIVDccLZ0JTH3lhg.png',
  models: [
    {
      name: 'products',
      route: 'products',
      endpoint: 'products',
      only: only(actions.INDEX, actions.DESTROY, actions.SHOW, actions.EDIT, actions.CREATE),
      create: ['id'],
      edit: ['name', 'avatar', 'stock', 'status', 'date'],
      show: ['name', 'avatar', 'description', 'date'],
      index: ['id', 'name', 'description', 'date'],
      hide_actions: false,
      attributes: [
        {
          name: 'id',
          type: 'text',
          columnProportion: 0
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Product name',
          columnProportion: 1,
          componentAttributes: {
            label: 'name',
            name: 'name',
            inputId: 'name',
            dataFor: 'name',
            inputType: 'text'
          }
        },
        {
          name: 'avatar',
          type: 'text',
          placeholder: 'Product description',
          columnProportion: 3,
          componentAttributes: {
            label: 'avatar',
            inputType: 'text'
          }
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Product description',
          columnProportion: 3,
          componentAttributes: {
            label: 'avatar',
            inputType: 'text'
          }
        },
        {
          name: 'stock',
          type: 'number',
          placeholder: 'Product description',
          columnProportion: 3,
          componentAttributes: {
            label: 'stock',
            inputType: 'number'
          }
        },
        {
          name: 'status',
          type: 'select',
          placeholder: 'Product description',
          columnProportion: 3,
          componentAttributes: {
            label: 'status',
            inputType: 'select',
            options: ['CREATED', 'PENDING', 'DELIVERED', 'CLOSED']
          }
        },
        {
          name: 'date',
          type: 'date',
          placeholder: 'Product description',
          columnProportion: 3,
          format: value => moment(value).format('DD/MM/YYYY'),
          componentAttributes: {
            label: 'date',
            inputType: 'date'
          }
        },
        {
          name: 'images',
          type: 'has_many',
          placeholder: 'Images'
        }
      ]
    },
    {
      name: 'schools',
      route: 'schools',
      endpoint: 'schools',
      attributes: [
        {
          name: 'name',
          type: 'text',
          componentAttributes: {
            label: 'name',
            name: 'name',
            inputId: 'name',
            dataFor: 'name',
            inputType: 'text'
          },
          columnProportion: 1
        },
        {
          name: 'students_count',
          type: 'number',
          componentAttributes: {
            label: 'students_count',
            name: 'students_count',
            inputId: 'students_count',
            dataFor: 'students_count',
            inputType: 'number'
          },
          columnProportion: 1
        }
      ]
    }
  ]
};

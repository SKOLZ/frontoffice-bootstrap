import { t } from 'i18next';

import styles from './styles.module.scss';

import { stripObjectBasedOnKeyArray } from '~utils/general';
import { formatBodies } from '~components/Table/utils';

export const parseColumns = ({ columns, baseColumns }) =>
  stripObjectBasedOnKeyArray({
    key: 'key',
    source: columns,
    baseArray: baseColumns
  });

export const parseList = (list, endpoint) => {
  const bodies = formatBodies({
    bodies: list,
    options: {
      rowFormatter: row => {
        const newRowBody = {
          id: row.id,
          data: row,
          url: `/${endpoint}/${row.id}`,
          config: {
            styles: { rowLink: styles.rowLink }
          }
        };

        return newRowBody;
      }
    },
    formatter: body => ({
      emptyBodyMessage: t('Table:empty'),
      key: body.key,
      rows: body.rows
    })
  });

  return bodies;
};

export const getColumns = columns =>
  columns
    ? columns.reduce((obj, item) => {
        obj[item.name] = item;
        return obj;
      }, {})
    : {};

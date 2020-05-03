import { defaultCamelcase } from '~serializer/defaultSerializer';

// eslint-disable-next-line no-unused-vars
export const formatPaging = ({ page, ...rest }) => defaultCamelcase.serialize(rest);

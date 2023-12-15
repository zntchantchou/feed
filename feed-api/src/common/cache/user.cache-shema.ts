import { RediSearchSchema, SchemaFieldTypes } from 'redis';

export const userSchema: RediSearchSchema = {
  '$.uid': {
    type: SchemaFieldTypes.TEXT,
    AS: 'uid',
  },
  '$.displayName': {
    type: SchemaFieldTypes.TEXT,
    AS: 'displayName',
  },
  '$.email': {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: 'email',
  },
  '$.photoUrl': {
    type: SchemaFieldTypes.TEXT,
    AS: 'photoUrl',
  },
};

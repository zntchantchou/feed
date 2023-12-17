import { RediSearchSchema, SchemaFieldTypes } from 'redis';

export const userSchema: RediSearchSchema = {
  '$.uid': {
    type: SchemaFieldTypes.TEXT,
    AS: 'uid',
  },
  '$.displayName': {
    type: SchemaFieldTypes.TEXT,
    AS: 'displayname',
  },
  '$.shortEmail': {
    type: SchemaFieldTypes.TEXT,
    AS: 'shortEmail',
  },
  '$.photoUrl': {
    type: SchemaFieldTypes.TEXT,
    AS: 'photourl',
  },
};

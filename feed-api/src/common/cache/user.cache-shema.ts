import { RediSearchSchema, SchemaFieldTypes } from 'redis';

export const userSchema: RediSearchSchema = {
  '$.uid': {
    type: SchemaFieldTypes.TEXT,
  },
  '$.displayName': {
    type: SchemaFieldTypes.TEXT,
  },
  '$.email': {
    type: SchemaFieldTypes.TEXT,
  },
  '$.photoUrl': {
    type: SchemaFieldTypes.TEXT,
  },
};

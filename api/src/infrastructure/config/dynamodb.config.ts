import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDB } from 'aws-sdk';

export const DYNAMODB_CLIENT = 'DYNAMODB_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: DYNAMODB_CLIENT,
      useFactory: (configService: ConfigService): DynamoDB.DocumentClient => {
        const isLocal = configService.get<string>('DYNAMODB_IS_LOCAL', 'false') === 'true';
        const region = configService.get<string>('AWS_REGION', 'us-east-1');
        
        const dynamoOptions: DynamoDB.ClientConfiguration = {
          region,
          ...(isLocal && {
            endpoint: configService.get<string>('DYNAMODB_ENDPOINT', 'http://localhost:8000'),
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID', 'local'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY', 'local'),
          }),
        };

        return new DynamoDB.DocumentClient(dynamoOptions);
      },
      inject: [ConfigService],
    },
  ],
  exports: [DYNAMODB_CLIENT],
})
export class DynamoDBConfigModule {}

export const InjectDynamoDB = () => {
  return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
    const indices = (Reflect.getMetadata('dynamodb:inject:indices', target.constructor) || []) as number[];
    indices.push(parameterIndex);
    Reflect.defineMetadata('dynamodb:inject:indices', indices, target.constructor);
  };
};

export interface DynamoDBConfig {
  region: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  tableName: string;
}

export const getDynamoDBTableConfig = (configService: ConfigService): DynamoDBConfig => {
  return {
    region: configService.get<string>('AWS_REGION', 'us-east-1'),
    endpoint: configService.get<string>('DYNAMODB_ENDPOINT'),
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    tableName: configService.get<string>('DYNAMODB_TABLE_NAME', 'orders'),
  };
};
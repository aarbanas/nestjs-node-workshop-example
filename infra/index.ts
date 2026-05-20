import 'reflect-metadata';
import * as cdk from 'aws-cdk-lib';
import { APIStack } from './stacks/api-stack';
import { EventHandlerStack } from './stacks/event-handler-stack';
import { StorageStack } from './stacks/storage-stack';

const app = new cdk.App();

const env = {
  account: '000000000000',
  region: 'eu-central-1',
};

const storageStack = new StorageStack(app, 'StorageStack', { env });

new APIStack(app, 'ApiStack', { env, bucket: storageStack.bucket });
new EventHandlerStack(app, 'EventHandlerStack', {
  env,
  bucket: storageStack.bucket,
});

app.synth();

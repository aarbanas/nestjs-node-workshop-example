import 'reflect-metadata';
import * as cdk from 'aws-cdk-lib';
import { APIStack } from './stacks/api-stack';
import { EventHandlerStack } from './stacks/event-handler-stack';

const app = new cdk.App();

const env = {
  account: '000000000000',
  region: 'eu-central-1',
};

new APIStack(app, 'ApiStack', { env });
new EventHandlerStack(app, 'EventHandlerStack', { env });

app.synth();

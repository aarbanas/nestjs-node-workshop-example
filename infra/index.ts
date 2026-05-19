import 'reflect-metadata';
import * as cdk from 'aws-cdk-lib';
import { APIStack } from './stacks/api-stack';

const app = new cdk.App();

new APIStack(app, 'ApiStack', {
  env: {
    account: '000000000000',
    region: 'eu-central-1',
  },
});

app.synth();

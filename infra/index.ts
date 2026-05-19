import 'reflect-metadata';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

const ACCOUNT = '000000000000';
const REGION = 'eu-central-1';

// TODO-1: include API resources

app.synth();

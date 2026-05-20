import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from 'constructs';
import path from 'node:path';

export class EventHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'CarEventsQueue', {
      queueName: 'car-events-queue',
    });

    const createCarEventHandlerFn = new lambda.Function(
      this,
      'CreateCarEventHandlerFn',
      {
        functionName: 'create-car-event-handler-fn',
        runtime: lambda.Runtime.NODEJS_24_X,
        // TODO: determine what should go here - the correct handler name
        handler: '',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../dist'), {
          exclude: ['*.map'],
        }),
        memorySize: 512,
        timeout: cdk.Duration.seconds(30),
        environment: {
          NODE_ENV: 'production',
        },
      },
    );

    createCarEventHandlerFn.addEventSource(
      new SqsEventSource(queue, {
        batchSize: 10,
      }),
    );

    new cdk.CfnOutput(this, 'CarEventsQueueUrl', {
      value: queue.queueUrl,
      description: 'SQS queue URL for car events',
    });
  }
}

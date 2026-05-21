import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import path from 'node:path';

interface APIStackProps extends cdk.StackProps {
  bucket: s3.IBucket;
}

export class APIStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: APIStackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, 'APILambdaFn', {
      functionName: 'api-lambda-fn',
      runtime: lambda.Runtime.NODEJS_24_X,
      handler: 'lambda.handler',
      // TODO-1: set the path to the directory where bundled app file is located
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist'), {
        exclude: ['*.map'],
      }),
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: {
        NODE_ENV: 'production',
        // TODO-2: determine which suffix is assigned to the API Gateway endpoint and set it here are base
        API_BASE_URL: '/dev',
        S3_BUCKET_NAME: props.bucket.bucketName,
      },
    });

    // TODO-3: allow Lambda function bucket access

    const api = new apigateway.RestApi(this, 'APIGateway', {
      restApiName: 'api-gateway',
      description: 'API Gateway for NestJS Workshop Lambda',
      deployOptions: {
        stageName: 'dev',
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction, {
      proxy: true,
    });

    api.root.addMethod('ANY', lambdaIntegration);
    api.root.addProxy({
      defaultIntegration: lambdaIntegration,
      anyMethod: true,
    });
  }
}

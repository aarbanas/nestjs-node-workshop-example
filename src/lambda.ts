import serverlessExpress from '@codegenie/serverless-express';
import { Context, Handler } from 'aws-lambda';
import { NestExpressApplication } from '@nestjs/platform-express';

let server: Handler | undefined;

async function bootstrapLambda(): Promise<Handler> {
  // TODO: create an app instance and initialize it
  const app = {} as NestExpressApplication;

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler = async (
  event: unknown,
  context: Context,
): Promise<unknown> => {
  server = server ?? (await bootstrapLambda());

  return server(event, context, undefined as any);
};

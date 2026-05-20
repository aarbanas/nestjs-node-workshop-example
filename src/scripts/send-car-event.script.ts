import {
  SQSClient,
  GetQueueUrlCommand,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';
import { randomUUID } from 'node:crypto';

const client = new SQSClient({
  endpoint: 'http://localhost:4566',
  region: 'eu-central-1',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test',
  },
});

// TODO: set the queue name
const QUEUE_NAME = '';

(async () => {
  const { QueueUrl } = await client.send(
    new GetQueueUrlCommand({ QueueName: QUEUE_NAME }),
  );

  const payload = {
    manufacturerId: randomUUID(),
    model: 'Taycan GTS Sport Turismo',
    year: 2025,
  };

  await client.send(
    new SendMessageCommand({
      QueueUrl,
      MessageBody: JSON.stringify(payload),
    }),
  );

  console.log(`Message sent to ${QueueUrl}:`);
  console.log(JSON.stringify(payload, null, 2));
})();

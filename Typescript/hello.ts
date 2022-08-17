import { Stack, App, aws_s3 as s3 } from 'aws-cdk-lib';

const app = new App();
const stack = new Stack(app, 'TestStack');

new s3.Bucket(stack, 'TestBucket');
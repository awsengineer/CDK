#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Ec2VpcStack } from '../lib/ec2-vpc-stack';

const app = new cdk.App();
new Ec2VpcStack(app, 'Ec2VpcStack');

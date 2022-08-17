#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MycdktestStack } from '../lib/mycdktest-stack';

const app = new cdk.App();
new MycdktestStack(app, 'MycdktestStack');

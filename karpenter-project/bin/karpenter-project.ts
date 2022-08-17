#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { KarpenterProjectStack } from '../lib/karpenter-project-stack';

const app = new cdk.App();
new KarpenterProjectStack(app, 'KarpenterProjectStack');

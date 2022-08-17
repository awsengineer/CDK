import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { CfnLayerVersionPermission } from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';

export class Ec2VpcStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /*const queue = new sqs.Queue(this, 'Ec2VpcQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'Ec2VpcTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));  */

    /*
    const vpcProps = {
      cidr: '10.0.0.0/16',
      maxAzs: 3,
      subnetConfiguration: [{
        name: 'subnet1',
        subnetType: ec2.SubnetType.PUBLIC,
        reserved: false,
      },
      {
        name: 'subnet2',
        subnetType: ec2.SubnetType.PUBLIC,
        reserved: false,
      },
      {
        name: 'subnet3',
        subnetType: ec2.SubnetType.PUBLIC,
        reserved: false,
      }
      ]
    }  */

    const vpc = new ec2.Vpc(this, 'EMR_VPC', {
      // If you don't specify the env for the stack (or AZs of the VPC as below) explicitly,
      // the VPC will be considered as environment-agnostic, and only two AZs will be considered.
      // Obviously this is because some regions have only two AZs.
      //availabilityZones: ['ap-southeast-2a', 'ap-southeast-2b', 'ap-southeast-2c'],
      
      availabilityZones: [this.region+'a', this.region + 'b', this.region + 'c'],
      vpcName: 'EMR_VPC',
      cidr: '10.0.0.0/16',
      enableDnsHostnames: true,
      enableDnsSupport: true,
      //maxAzs: 99,   // big number to force it use the max number of AZs in the region
      //Whatever you configure in subnetConfiguraitoin, will be multiplied by the number of AZs. In the following example, three public subnets will be created in three AZs
      subnetConfiguration: [{
        name: 'subnetConfig1',
        subnetType: ec2.SubnetType.PUBLIC
      }
      ]
    });
  };
}

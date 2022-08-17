import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as najar from '../node_modules/cdk-eks-karpenter';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as blueprints from '@aws-quickstart/eks-blueprints';

export class KarpenterProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const clusterRole = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    const vpc = new ec2.Vpc(this, 'Vpc', { natGateways: 1 });

    const cluster = new eks.Cluster(this, 'eks-cluster-with-carpenter', {
      version: eks.KubernetesVersion.V1_21,
      clusterName: "k1",
      defaultCapacity: 1,
      //deddfaultCapacityInstance: ec2.InstanceType.of(ec2.InstanceClass.T3A, ec2.InstanceSize.LARGE),
      vpc,
      //vpcSubnets: [{ subnetType: ec2.SubnetType.PRIVATE_WITH_NAT }],
    });

    const karpenter = new najar.Karpenter(this, 'Karpenter', {
      cluster,
    });

    karpenter.addProvisioner('spot-provisioner', {
      requirements: [{
        key: 'karpenter.sh/capacity-type',
        operator: 'In',
        values: ['spot']
      }],
      limits: {
        resources: {
          cpu: 500
        }
      },
      provider: {
        subnetSelector: {
          Name: '*PublicSubnet*'
        },
        securityGroupSelector: {
          'aws:eks:cluster-name': cluster.clusterName
        }
      }
    });

    const cfnAddonProps: eks.CfnAddonProps = {
      addonName: 'Amazon VPC CNI',
      clusterName: cluster.clusterName,
    
      tags: [{
        key: 'moi',
        value: 'toi',
      }],
    };

  }
}
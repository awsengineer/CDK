// lib/my-eks-blueprints-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export default class ClusterConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const account = props?.env?.account!;
    const region = props?.env?.region!;
    const vpcCni = new blueprints.addons.VpcCniAddOn();
    const coreDns = new blueprints.addons.CoreDnsAddOn();

    // Test VPC for EMR test
    const vpc = new ec2.Vpc(this, 'EMRVPC', {
      cidr: "10.0.0.0/17"
    })

    const karpenterAddonProps = {
      provisionerSpecs: {
        //'node.kubernetes.io/instance-type': ['m5.2xlarge'],
        //'topology.kubernetes.io/zone': ['us-east-1c'],
        'kubernetes.io/arch': ['amd64', 'arm64'],
        'karpenter.sh/capacity-type': ['spot'], //, 'on-demand'],
      },
      subnetTags: {
        "Name": "blueprint-construct-dev/blueprint-construct-dev-vpc/PrivateSubnet1",
      },
      securityGroupTags: {
        "kubernetes.io/cluster/blueprint-construct-dev": "owned",
      },
      /*taints: [{
        key: "workload",
        value: "test",
        effect: "NoSchedule",
      }],*/
      //amiFamily: "Bottlerocket",
    };

    /*
    const karpenterAddOn = new blueprints.addons.KarpenterAddOn(karpenterAddonProps);

    // comment
    
    const blueprint = blueprints.EksBlueprint.builder()
      .account(account)
      .region(region)
      .addOns(vpcCni, coreDns, karpenterAddOn)
      .teams()
      .build(scope, 'my-' + id + '-stack');
    */
   
  };

}
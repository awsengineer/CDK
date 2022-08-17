// lib/my-eks-blueprints-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';

export default class ClusterConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const account = props?.env?.account!;
    const region = props?.env?.region!;
    const vpcCni = new blueprints.addons.VpcCniAddOn();
    const coreDns = new blueprints.addons.CoreDnsAddOn();

    // comment
    const blueprint = blueprints.EksBlueprint.builder()
      .account(account)
      .region(region)
      .addOns(vpcCni, coreDns)
      .teams()
      .build(scope, 'my-' + id + '-stack');
  };

}
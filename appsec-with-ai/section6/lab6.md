# Lab: Writing and Running Cloud Custodian Policies

**Duration:** 10 minutes
**Objective:** Learn to write and execute Cloud Custodian policies to enforce security and compliance rules in AWS (S3) and Azure (Resource Groups).

---

## Prerequisites
- Python 3.11+ installed
- AWS account with S3 access (or AWS CLI configured)
- Azure account (or Azure CLI configured)
- Basic understanding of cloud resources

---

## Part 1: Setup

1. **Install Cloud Custodian:**
   ```bash
   pip install c7n c7n-azure
   ```

2. **Create a working directory:**
   ```bash
   mkdir cloud-custodian-lab && cd cloud-custodian-lab
   ```

3. **Verify installation:**
   ```bash
   custodian version
   ```

---

## Part 2: AWS S3 Bucket Policy

### Create an S3 Security Policy

1. **Create `aws-s3-policy.yml`:**

```yaml
policies:
  - name: s3-public-bucket-remediation
    description: |
      Find S3 buckets that are publicly accessible and mark them for review.
      This policy identifies security risks in bucket configurations.
    resource: s3
    filters:
      # Find buckets with public access
      - type: bucket-encryption
        state: false
      - or:
        - type: cross-account
        - type: global-grants
          allow_website: false
          operator: or
          permissions:
            - READ
            - READ_ACP
    actions:
      # Mark with a tag for review
      - type: tag
        key: SecurityRisk
        value: PublicAccess
      # Send notification (optional - requires SNS setup)
      # - type: notify
      #   to:
      #     - security@example.com
      #   subject: "S3 Bucket Security Alert"

  - name: s3-enforce-encryption
    description: Find S3 buckets without encryption enabled
    resource: s3
    filters:
      - type: bucket-encryption
        state: false
    actions:
      # Enable default encryption
      - type: set-bucket-encryption
        enabled: true
        crypto: AES256

  - name: s3-block-public-access
    description: Ensure S3 buckets have Block Public Access enabled
    resource: s3
    filters:
      - not:
        - type: bucket-public-block
          BlockPublicAcls: true
          BlockPublicPolicy: true
          IgnorePublicAcls: true
          RestrictPublicBuckets: true
    actions:
      - type: set-public-block
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
```

2. **Validate the policy:**
   ```bash
   custodian validate aws-s3-policy.yml
   ```

3. **Run in dry-run mode (check what would happen):**
   ```bash
   custodian run --dryrun -s output/aws aws-s3-policy.yml
   ```

4. **Execute the policy (be careful in production!):**
   ```bash
   # Use --dryrun first to test
   custodian run -s output/aws aws-s3-policy.yml --region us-east-1
   ```

5. **View results:**
   ```bash
   # View the resources found
   cat output/aws/s3-enforce-encryption/resources.json

   # View execution logs
   cat output/aws/s3-enforce-encryption/custodian-run.log
   ```

---

## Part 3: Azure Resource Group Policy

### Create an Azure Resource Group Policy

1. **Create `azure-rg-policy.yml`:**

```yaml
policies:
  - name: azure-rg-require-tags
    description: |
      Ensure all Azure resource groups have required tags for compliance.
      Tags required: Environment, Owner, CostCenter
    resource: azure.resourcegroup
    filters:
      # Find resource groups missing required tags
      - or:
        - type: value
          key: tags.Environment
          value: absent
        - type: value
          key: tags.Owner
          value: absent
        - type: value
          key: tags.CostCenter
          value: absent
    actions:
      # Add a compliance tag
      - type: tag
        tags:
          ComplianceStatus: "Missing Required Tags"
          ReviewDate: "2025-11-01"

  - name: azure-rg-enforce-naming
    description: Find resource groups that don't follow naming conventions
    resource: azure.resourcegroup
    filters:
      # Resource groups should start with 'rg-'
      - type: value
        key: name
        op: regex
        value: "^(?!rg-).*"
    actions:
      # Tag non-compliant resource groups
      - type: tag
        tags:
          NamingCompliance: "NonCompliant"
          ExpectedPattern: "rg-[environment]-[project]-[region]"

  - name: azure-rg-stale-resources
    description: Identify old resource groups for cleanup
    resource: azure.resourcegroup
    filters:
      # Find resource groups older than 180 days with no activity
      - type: value
        key: tags.CreatedDate
        value_type: age
        op: greater-than
        value: 180
      - type: value
        key: tags.Environment
        value: "dev"
    actions:
      - type: tag
        tags:
          StaleResource: "true"
          ReviewForDeletion: "true"

  - name: azure-rg-lock-production
    description: Ensure production resource groups have deletion locks
    resource: azure.resourcegroup
    filters:
      - type: value
        key: tags.Environment
        value: "production"
      # Check if lock is not present
      - not:
        - type: resource-lock
          lock-type: CanNotDelete
    actions:
      # Add a read-only or deletion lock
      - type: resource-lock
        lock-type: CanNotDelete
```

2. **Validate the Azure policy:**
   ```bash
   custodian validate azure-rg-policy.yml
   ```

3. **Run in dry-run mode:**
   ```bash
   custodian run --dryrun -s output/azure azure-rg-policy.yml
   ```

4. **Execute the policy (authenticate first):**
   ```bash
   # Login to Azure
   az login

   # Run the policy
   custodian run -s output/azure azure-rg-policy.yml
   ```

5. **View results:**
   ```bash
   # View resource groups that need tags
   cat output/azure/azure-rg-require-tags/resources.json

   # View execution logs
   cat output/azure/azure-rg-require-tags/custodian-run.log
   ```

---

## Understanding the Policy Structure

### Basic Policy Anatomy

```yaml
policies:
  - name: policy-name              # Unique identifier
    description: What it does       # Human-readable description
    resource: resource-type         # AWS: s3, ec2, etc. Azure: azure.resourcegroup
    filters:                        # Conditions to match resources
      - type: filter-type
        key: attribute
        value: expected-value
    actions:                        # What to do with matched resources
      - type: action-type
        parameter: value
```

### Common Filters
- `value`: Check resource attributes
- `tag`: Filter by tags
- `age`: Filter by creation date
- `or/and/not`: Logical operators

### Common Actions
- `tag`: Add/update tags
- `notify`: Send notifications
- `delete`: Remove resources
- `stop`: Stop running resources

---

## Testing Your Policies

**Create a simple test policy (`test-policy.yml`):**

```yaml
policies:
  - name: list-s3-buckets
    description: Simple policy to list all S3 buckets
    resource: s3
    filters:
      - type: value
        key: Name
        value: "*"
    actions:
      - type: tag
        key: ScannedBy
        value: CloudCustodian
```

**Run it:**
```bash
custodian run --dryrun -s output/test test-policy.yml
cat output/test/list-s3-buckets/resources.json | python -m json.tool
```

---

## Real-World Use Cases

### AWS S3 Examples
```yaml
# Delete empty buckets older than 30 days
- name: cleanup-empty-s3
  resource: s3
  filters:
    - type: bucket-size
      value: 0
    - type: value
      key: CreationDate
      value_type: age
      op: greater-than
      value: 30
  actions:
    - delete

# Enforce versioning
- name: s3-enable-versioning
  resource: s3
  filters:
    - type: bucket-versioning
      enabled: false
  actions:
    - type: toggle-versioning
      enabled: true
```

### Azure Resource Group Examples
```yaml
# Auto-tag with creation date
- name: auto-tag-creation
  resource: azure.resourcegroup
  filters:
    - type: value
      key: tags.CreatedDate
      value: absent
  actions:
    - type: auto-tag-date
      tag: CreatedDate

# Alert on untagged resources
- name: untagged-alert
  resource: azure.resourcegroup
  filters:
    - type: value
      key: tags
      value: empty
  actions:
    - type: webhook
      url: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

---

## Key Takeaways

 **Policy as Code** - Version control your compliance rules
 **Dry-run first** - Always test with `--dryrun` before execution
 **Multi-cloud** - Same tool for AWS, Azure, GCP
 **Automated compliance** - Run policies on schedule (cron, CI/CD)
 **Cost optimization** - Find and remove unused resources
 **Security enforcement** - Automatically remediate misconfigurations

---

## Common Commands Reference

```bash
# Validate policy syntax
custodian validate policy.yml

# Dry-run (see what would happen)
custodian run --dryrun -s output/ policy.yml

# Execute policy
custodian run -s output/ policy.yml

# Run specific policy by name
custodian run -s output/ policy.yml -p policy-name

# Generate policy documentation
custodian schema aws.s3

# View available filters for a resource
custodian schema aws.s3.filters
```

---

## Cleanup

```bash
cd ..
rm -rf cloud-custodian-lab
```

---

## Next Steps

- **Schedule policies** - Run via cron or CI/CD pipeline
- **Integrate notifications** - SNS, Slack, email alerts
- **Cost reports** - Generate spending analysis
- **Multi-account** - Use org-level policies
- **Custom filters** - Write Python filters for complex logic

---

**Resources:**
- Cloud Custodian Docs: https://cloudcustodian.io/docs/
- AWS Policies: https://cloudcustodian.io/docs/aws/
- Azure Policies: https://cloudcustodian.io/docs/azure/
- Policy Examples: https://github.com/cloud-custodian/cloud-custodian/tree/master/docs/source/aws/examples

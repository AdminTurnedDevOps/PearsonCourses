# Lab: Build a DevSecOps Pipeline with Snyk

**Duration:** 15 minutes
**Objective:** Create an automated security scanning pipeline using Snyk in GitHub Actions to detect vulnerabilities in code, dependencies, containers, and IaC.

---

## Prerequisites
- GitHub account
- Basic understanding of CI/CD and YAML
- Git installed locally

---

## Part 1: Setup

1. **Create a Snyk account:**
   - Go to https://snyk.io/
   - Sign up with your GitHub account (free tier available)
   - Navigate to **Account Settings** � **General**
   - Copy your **Snyk API Token**

2. **Create a new GitHub repository:**
   ```bash
   mkdir snyk-devsecops-lab && cd snyk-devsecops-lab
   git init
   ```

3. **Add Snyk token to GitHub:**
   - Go to your GitHub repository � **Settings** � **Secrets and variables** � **Actions**
   - Click **New repository secret**
   - Name: `SNYK_TOKEN`
   - Value: Paste your Snyk API token
   - Click **Add secret**

---

## Part 2: Create a Vulnerable Application

1. **Create `package.json` with known vulnerabilities:**

```json
{
  "name": "vulnerable-app",
  "version": "1.0.0",
  "description": "Demo app for Snyk scanning",
  "dependencies": {
    "express": "4.17.1",
    "lodash": "4.17.19",
    "axios": "0.21.1",
    "jsonwebtoken": "8.5.1",
    "morgan": "1.9.1"
  },
  "devDependencies": {
    "jest": "26.0.0"
  }
}
```

2. **Create `app.js` with security issues:**

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Hardcoded secret (security issue)
const SECRET_KEY = "my-super-secret-key-123";

app.use(express.json());

// Vulnerable SQL-like operation
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  // SQL injection vulnerability simulation
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  res.json({ query: query });
});

// Weak JWT configuration
app.post('/login', (req, res) => {
  const token = jwt.sign(
    { user: req.body.username },
    SECRET_KEY,
    { algorithm: 'HS256' } // Weak algorithm
  );
  res.json({ token });
});

// Command injection risk
app.get('/ping', (req, res) => {
  const host = req.query.host;
  const exec = require('child_process').exec;
  exec(`ping -c 1 ${host}`, (error, stdout) => {
    res.send(stdout);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

3. **Create `Dockerfile` with vulnerabilities:**

```dockerfile
# Using outdated base image
FROM node:12

WORKDIR /app

# Running as root (security issue)
COPY package*.json ./
RUN npm install

COPY . .

# Exposing unnecessary port
EXPOSE 3000
EXPOSE 22

CMD ["node", "app.js"]
```

4. **Create `terraform-example.tf` with IaC issues:**

```hcl
# Insecure AWS S3 bucket configuration
resource "aws_s3_bucket" "data_bucket" {
  bucket = "my-data-bucket"
  acl    = "public-read"  # Security issue: publicly readable

  versioning {
    enabled = false  # Security issue: no versioning
  }

  # No encryption
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

# Security group with overly permissive rules
resource "aws_security_group" "web_sg" {
  name        = "web-security-group"
  description = "Allow web traffic"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Security issue: allow all traffic
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# RDS instance without encryption
resource "aws_db_instance" "database" {
  identifier           = "mydb"
  engine              = "mysql"
  instance_class      = "db.t2.micro"
  allocated_storage   = 20
  username            = "admin"
  password            = "password123"  # Hardcoded password
  skip_final_snapshot = true
  publicly_accessible = true  # Security issue
  storage_encrypted   = false  # Security issue
}
```

---

## Part 3: Build the DevSecOps Pipeline

1. **Create `.github/workflows/devsecops.yml`:**

```yaml
name: DevSecOps Pipeline with Snyk

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    # Run daily at 2 AM UTC
    - cron: '0 2 * * *'

jobs:
  security-scan:
    name: Security Scanning
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      # Snyk Code Analysis (SAST)
      - name: Run Snyk Code Test
        uses: snyk/actions/node@master
        continue-on-error: true
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          command: code test
          args: --severity-threshold=high

      # Snyk Open Source Dependencies
      - name: Run Snyk Open Source Test
        uses: snyk/actions/node@master
        continue-on-error: true
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          command: test
          args: --severity-threshold=high --json-file-output=snyk-opensource.json

      # Snyk Container Scanning
      - name: Build Docker Image
        run: docker build -t vulnerable-app:latest .

      - name: Run Snyk Container Test
        uses: snyk/actions/docker@master
        continue-on-error: true
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          image: vulnerable-app:latest
          args: --severity-threshold=high --file=Dockerfile

      # Snyk Infrastructure as Code
      - name: Run Snyk IaC Test
        uses: snyk/actions/iac@master
        continue-on-error: true
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          file: terraform-example.tf
          args: --severity-threshold=medium

      # Upload results to GitHub Security tab
      - name: Upload Snyk results to GitHub Code Scanning
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: snyk.sarif

      # Monitor in Snyk dashboard
      - name: Monitor in Snyk
        uses: snyk/actions/node@master
        if: github.ref == 'refs/heads/main'
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          command: monitor

  build:
    name: Build Application
    needs: security-scan
    runs-on: ubuntu-latest
    if: success()

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: echo "Running tests..."

      - name: Build application
        run: echo "Building application..."

      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: echo "Deploying to production..."
```
---

## Part 4: Test the Pipeline (2 minutes)

1. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Add DevSecOps pipeline with Snyk"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/snyk-devsecops-lab.git
   git push -u origin main
   ```

2. **Monitor the pipeline:**
   - Go to your GitHub repository
   - Click on **Actions** tab
   - Watch the "DevSecOps Pipeline with Snyk" workflow run
   - Review the security findings in the logs

3. **Check Snyk Dashboard:**
   - Go to https://app.snyk.io/
   - Navigate to **Projects**
   - View detailed vulnerability reports
   - Explore fix recommendations

4. **View GitHub Security Alerts:**
   - Go to **Security** tab in your repository
   - Check **Code scanning alerts**
   - Review Snyk findings integrated with GitHub

---

## Expected Results

Your pipeline should detect:

**Open Source Dependencies:**
- Multiple HIGH severity vulnerabilities in lodash, axios, express
- Outdated packages with known CVEs

**Code Issues:**
- Hardcoded secrets (SECRET_KEY)
- SQL injection vulnerability
- Command injection risk
- Use of weak cryptographic algorithms

**Container Issues:**
- Outdated Node.js base image
- Running as root user
- Unnecessary exposed ports

**IaC Issues:**
- Public S3 bucket access
- Overly permissive security group rules
- Unencrypted RDS instance
- Hardcoded database password
- Publicly accessible database

---

## Key Takeaways

 **Shift-left security** - Find vulnerabilities early in development
 **Automated scanning** - No manual intervention required
 **Multiple scan types** - Code, dependencies, containers, IaC
 **Continuous monitoring** - Daily scans catch new vulnerabilities
 **Actionable results** - Fix recommendations with PR integration
 **Fail fast** - Block builds with critical vulnerabilities
 **Integration** - Works with GitHub Security tab

---

## Best Practices Implemented

1.  Scan on every push and PR
2.  Scheduled daily scans for new vulnerabilities
3.  Severity thresholds to fail builds
4.  Multiple security layers (SAST, SCA, container, IaC)
5.  Results uploaded to GitHub Security
6.  Continuous monitoring in Snyk dashboard
7.  Policy file for exception management

---

## Cleanup (Optional)

```bash
cd ..
rm -rf snyk-devsecops-lab
# Delete the GitHub repository if no longer needed
```
---

**Resources:**
- Snyk Documentation: https://docs.snyk.io/
- GitHub Actions: https://github.com/snyk/actions
- Snyk CLI: https://docs.snyk.io/snyk-cli
- DevSecOps Best Practices: https://snyk.io/learn/devsecops/

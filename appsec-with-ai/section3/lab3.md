# Lab: Analyzing AI-Generated Code with Static Analysis

**Duration:** 15 minutes
**Objective:** Learn to identify security vulnerabilities in AI-generated code using static analysis tools (Bandit, Semgrep, and CodeQL).

---

## Prerequisites
- Python 3.11+ installed
- Basic understanding of security vulnerabilities
- Code editor (VS Code, vim, etc.)

---

## Part 1: Setup

1. **Create a lab directory:**
   ```bash
   mkdir ai-code-analysis && cd ai-code-analysis
   ```

2. **Install static analysis tools:**
   ```bash
   # Install Bandit (Python security linter)
   pip install bandit

   # Install Semgrep (multi-language SAST)
   pip install semgrep
   ```

3. **Create a Python virtual environment (optional but recommended):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

---

## Part 2: Analyze AI-Generated Code Sample

### Scenario
Your team used an AI coding assistant to quickly generate a user authentication API. Now you need to audit it for security issues.

1. **Create `ai_generated_auth.py`:**

```python
import pickle
import sqlite3
import hashlib
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

# AI-generated database setup
def init_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, role TEXT)')
    conn.commit()
    conn.close()

# AI-generated login endpoint
@app.route('/login', methods=['POST'])
def login():
    username = request.args.get('username')
    password = request.args.get('password')

    # Hash the password
    hashed = hashlib.md5(password.encode()).hexdigest()

    # Query database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{hashed}'"
    cursor.execute(query)
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"status": "success", "role": user[2]})
    return jsonify({"status": "failed"}), 401

# AI-generated session management
@app.route('/save_session', methods=['POST'])
def save_session():
    session_data = request.get_json()
    with open(f"/tmp/session_{session_data['user_id']}.pkl", 'wb') as f:
        pickle.dump(session_data, f)
    return jsonify({"status": "saved"})

@app.route('/load_session', methods=['GET'])
def load_session():
    user_id = request.args.get('user_id')
    with open(f"/tmp/session_{user_id}.pkl", 'rb') as f:
        session_data = pickle.load(f)
    return jsonify(session_data)

# AI-generated file upload
@app.route('/upload', methods=['POST'])
def upload():
    filename = request.args.get('filename')
    content = request.data

    # Save file
    filepath = f"/var/www/uploads/{filename}"
    with open(filepath, 'wb') as f:
        f.write(content)

    return jsonify({"status": "uploaded", "path": filepath})

# AI-generated admin check
@app.route('/admin', methods=['GET'])
def admin():
    token = request.args.get('token')
    if token == "admin123":
        os.system(f"cat /etc/passwd")
        return jsonify({"status": "admin access granted"})
    return jsonify({"status": "unauthorized"}), 403

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0')
```

2. **Run Bandit analysis:**
   ```bash
   bandit -r ai_generated_auth.py -f json -o bandit_report.json
   bandit -r ai_generated_auth.py
   ```

3. **Run Semgrep analysis:**
   ```bash
   semgrep --config=auto ai_generated_auth.py
   ```

4. **Review the findings:**
   - How many HIGH severity issues were found?
   - What are the top 3 most critical vulnerabilities?

---

## Part 3: Identify and Document Vulnerabilities

**Create `vulnerability_report.md` documenting what you found:**

```markdown
# Security Analysis Report: AI-Generated Authentication Code

## Critical Vulnerabilities Found

### 1. SQL Injection (Line ~24)
- **Severity:** CRITICAL
- **Issue:** String concatenation in SQL query
- **Impact:** Attackers can bypass authentication or extract data
- **Fix:** Use parameterized queries

### 2. Weak Cryptography (Line ~21)
- **Severity:** HIGH
- **Issue:** MD5 is cryptographically broken
- **Impact:** Passwords can be cracked easily
- **Fix:** Use bcrypt or Argon2

### 3. Command Injection (Line ~56)
- **Severity:** CRITICAL
- **Issue:** os.system() with user input
- **Impact:** Remote code execution
- **Fix:** Never execute shell commands based on user input

### 4. Insecure Deserialization (Line ~36)
- **Severity:** CRITICAL
- **Issue:** pickle.load() on untrusted data
- **Impact:** Remote code execution
- **Fix:** Use JSON instead of pickle

### 5. Path Traversal (Line ~45)
- **Severity:** HIGH
- **Issue:** Unsanitized filename in file path
- **Impact:** Write files anywhere on system
- **Fix:** Validate and sanitize filenames

### 6. Hardcoded Credentials (Line ~54)
- **Severity:** HIGH
- **Issue:** Hardcoded admin token
- **Impact:** Anyone can access admin panel
- **Fix:** Use proper authentication and secrets management

### 7. Debug Mode in Production (Line ~61)
- **Severity:** MEDIUM
- **Issue:** Flask debug mode enabled
- **Impact:** Information disclosure, potential RCE
- **Fix:** Disable debug mode in production

### 8. Exposed Host Binding (Line ~61)
- **Severity:** MEDIUM
- **Issue:** Binding to 0.0.0.0
- **Impact:** Accessible from external networks
- **Fix:** Bind to localhost or use reverse proxy

## Summary
- **Total Issues:** 8
- **Critical:** 3
- **High:** 3
- **Medium:** 2

**Conclusion:** This AI-generated code contains multiple severe vulnerabilities and should NOT be deployed without significant security improvements.
```

Save this report manually or by creating the file.
---

## Key Findings

**Common AI Code Generation Security Issues:**
1.  SQL injection from string concatenation
2.  Weak cryptographic algorithms (MD5, SHA1)
3.  Command injection vulnerabilities
4.  Insecure deserialization
5.  Path traversal vulnerabilities
6.  Hardcoded secrets
7.  Debug mode enabled
8.  Missing input validation

---

## Cleanup

```bash
deactivate  # If using virtual environment
cd .. && rm -rf ai-code-analysis
```

---

## Key Takeaways

- **Never trust AI-generated code blindly** - always review and test
- **Static analysis is essential** - catches common vulnerabilities automatically
- **Use multiple tools** - different tools find different issues
- **Understand the vulnerabilities** - don't just fix, understand why it's vulnerable
- **Establish security baselines** - run SAST on all code before deployment
- **AI lacks security context** - models prioritize functionality over security

---

## Additional Tools to Explore

- **Snyk Code:** Free tier available, great IDE integration
- **SonarQube:** Comprehensive code quality and security
- **CodeQL:** Advanced semantic analysis (GitHub)
- **PyCharm Security Plugin:** Real-time security hints
- **Bearer:** Privacy and security scanner

---

**Resources:**
- Bandit: https://github.com/PyCQA/bandit
- Semgrep: https://semgrep.dev/
- OWASP Top 10: https://owasp.org/www-project-top-ten/

# Lab: Threat Modeling with OWASP pytm

**Duration:** 10 minutes
**Objective:** Learn to use OWASP pytm to automatically generate threat models and identify security risks in application architectures.

---

## Prerequisites
- Python 3.11+ installed
- Basic understanding of application architecture

---

## Part 1: Setup

1. **Install pytm:**
   ```bash
   pip install pytm
   ```

2. **Install Graphviz** (for generating diagrams):
   - **macOS:** `brew install graphviz`
   - **Linux:** `apt-get install graphviz` or `yum install graphviz`
   - **Windows:** Download from https://graphviz.org/download/

3. **Create a working directory:**
   ```bash
   mkdir pytm-lab && cd pytm-lab
   ```

---

## Part 2: Build Your First Threat Model

1. **Create a file called `web_app_model.py`:**

```python
#!/usr/bin/env python3

from pytm import (
    TM, Server, Datastore, Dataflow, Boundary, Actor, Lambda
)

# Create the threat model
tm = TM("Web Application Threat Model")
tm.description = "Simple web application with database"
tm.isOrdered = True

# Define boundaries
internet = Boundary("Internet")
dmz = Boundary("DMZ")
internal = Boundary("Internal Network")

# Define actors
user = Actor("User")
user.inBoundary = internet

# Define components
web_server = Server("Web Server")
web_server.inBoundary = dmz
web_server.OS = "Ubuntu"
web_server.isHardened = False

app_server = Server("Application Server")
app_server.inBoundary = internal
app_server.OS = "Ubuntu"

database = Datastore("Database")
database.inBoundary = internal
database.isSQL = True
database.inScope = True

# Define data flows
user_to_web = Dataflow(user, web_server, "HTTPS Request")
user_to_web.protocol = "HTTPS"
user_to_web.dstPort = 443
user_to_web.data = "User credentials and data"
user_to_web.isEncrypted = True

web_to_app = Dataflow(web_server, app_server, "API Call")
web_to_app.protocol = "HTTP"
web_to_app.dstPort = 8080

app_to_db = Dataflow(app_server, database, "SQL Query")
app_to_db.protocol = "MySQL"
app_to_db.dstPort = 3306
app_to_db.data = "User data"
app_to_db.isEncrypted = False

db_to_app = Dataflow(database, app_server, "Query Result")
db_to_app.protocol = "MySQL"

app_to_web = Dataflow(app_server, web_server, "API Response")
app_to_web.protocol = "HTTP"

web_to_user = Dataflow(web_server, user, "HTTPS Response")
web_to_user.protocol = "HTTPS"
web_to_user.isEncrypted = True

# Generate the model
tm.process()
```

2. **Run the threat model:**
   ```bash
   python web_app_model.py
   ```

---

## Part 3: Analyze the Results

1. **Review the threats found** in the console output. You should see various STRIDE threats identified, such as:
   - Spoofing threats
   - Tampering risks
   - Information disclosure
   - Denial of service vulnerabilities
   - Elevation of privilege risks

2. **Generate a Data Flow Diagram:**
   ```bash
   python web_app_model.py --dfd
   ```
   This creates a `dfd.png` file showing your architecture.

3. **Generate a Sequence Diagram:**
   ```bash
   python web_app_model.py --seq
   ```
   This creates a `seq.png` file showing interaction flow.

4. **Generate a full report:**
   ```bash
   python web_app_model.py --report report.html
   ```
   Open `report.html` in your browser to view all identified threats.

---

## Key Observations

Notice how pytm automatically identified threats like:
- **AC01**: Unencrypted communication between web and app server
- **INP01**: SQL injection risks in database queries
- **AC02**: Lack of authentication between components
- **DS01**: Potential data tampering in transit

---

## Cleanup

```bash
cd .. && rm -rf pytm-lab
```

---

## Key Takeaways

- pytm automates STRIDE-based threat identification
- Visual diagrams help communicate architecture to stakeholders
- Security controls can be evaluated before implementation
- Threat models should be updated as architecture evolves

---

**Resources:**
- pytm GitHub: https://github.com/OWASP/pytm
- STRIDE Methodology: https://en.wikipedia.org/wiki/STRIDE_(security)

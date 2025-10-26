# Lab 1: OWASP Top 10 Vulnerability Analysis

## Objective
Identify and analyze one vulnerability from the OWASP Top 10 list, explaining why it's considered a security vulnerability.

## Lab Duration
15 minutes

---

## Instructions

### Step 1: Choose a Vulnerability

Visit https://owasp.org/www-project-top-ten/ and select **ONE** vulnerability from the OWASP Top 10 (2021):

- A01 - Broken Access Control
- A02 - Cryptographic Failures
- A03 - Injection
- A04 - Insecure Design
- A05 - Security Misconfiguration
- A06 - Vulnerable and Outdated Components
- A07 - Identification and Authentication Failures
- A08 - Software and Data Integrity Failures
- A09 - Security Logging and Monitoring Failures
- A10 - Server-Side Request Forgery (SSRF)

### Step 2: Document Your Analysis

Answer the following questions about your chosen vulnerability:

#### 1. Vulnerability Name & Description
- What is the vulnerability called?
- What does it mean in simple terms?

#### 2. Why is this a vulnerability?
Explain why this is a security issue:
- What can an attacker do?
- What security principle does it violate?
- What's the potential impact?

#### 3. Simple Example
Provide one concrete example of how this vulnerability could be exploited.

#### 4. How to Prevent It
List 2-3 ways to prevent this vulnerability.

---

## Example Template

```
Vulnerability: A03:2021 - Injection

Description:
Injection occurs when untrusted user input is sent directly to an
interpreter (like SQL, OS commands, or LDAP) without proper validation.

Why it's a vulnerability:
[Your explanation here...]

Example Attack:
[Your example here...]

Prevention:
1. [Prevention method 1]
2. [Prevention method 2]
3. [Prevention method 3]
```

---

## Resources
- [OWASP Top 10 2021](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)

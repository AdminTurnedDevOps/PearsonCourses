15 minutes

## Generate an App and Scan it

1. Use your favorite LLM

Prompt:
```
I want to create a Django application (Python framework).

This application will be to create an MVP of a Laboratory Information Management System (LIMS)

Here are a few details about the application:

1. Sample tracking: Registering, labeling, and tracking the movement of samples within the lab.
2. Test management: Defining tests, associating them with samples, and recording results.
3. Data entry and storage: Creating forms for data input and storing data in a database (e.g., PostgreSQL).
4. User authentication and authorization: Managing user access and permissions.
Reporting: Generating reports on sample status, test results, and other lab data.   
```

2. Run code tests:
```
snyk code test
```

3. Run dependency tests
```
snyk test
```
15 minutes

## Mac/Linux Installation
```
brew tap k8sgpt-ai/k8sgpt
brew install k8sgpt
```

## Windows Installation
Download the latest Windows binaries of k8sgpt from the Release tab(https://github.com/k8sgpt-ai/k8sgpt/releases) based on your system architecture.

Extract the downloaded package to your desired location. Configure the system path variable with the binary location

## Using k8sgpt

1. Setup
Currently the default AI provider is OpenAI, you will need to generate an API key from OpenAI (https://openai.com/)

You can do this by running `k8sgpt generate`. A brower will open to generate the token.

Run `k8sgpt auth add` add to set it in k8sgpt.

You can provide the password directly using the --password flag.

2. Test
To test and use k8sgpt, run the following:
```
k8sgpt analyze
```
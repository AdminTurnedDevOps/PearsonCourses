package main

import (
	"log"
	"os"

	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/cli"
)

func main() {
	// Call upon the CLI package
	settings := cli.New()

	// Create a new instance of the configuration
	config := new(action.Configuration)

	// Collect local Helm information
	if err := config.Init(settings.RESTClientGetter(), settings.Namespace(), os.Getenv("HELM_DRIVER"), log.Printf); err != nil {
		log.Printf("%+v", err)
	}

	// Create a new instance of the `List` action, which lists out your manifests.
	client := action.NewList(config)

	// List only Helm Charts that are deployed
	client.Deployed = true
	results, err := client.Run()
	if err != nil {
		log.Printf("%+v", err)
	}

	for _, result := range results {
		log.Printf("%+v", result)
	}
}

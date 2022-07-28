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
	actionConfig := new(action.Configuration)

	// Collect local Helm information
	if err := actionConfig.Init(settings.RESTClientGetter(), settings.Namespace(), os.Getenv("HELM_DRIVER"), log.Printf); err != nil {
		log.Printf("%+v", err)
		os.Exit(1)
	}

	// Create a new instance of the `List` action, which lists out your manifests.
	client := action.NewList(actionConfig)

	// List only Helm Charts that are deployed
	client.Deployed = true
	results, err := client.Run()
	if err != nil {
		log.Printf("%+v", err)
		os.Exit(1)
	}

	for _, rel := range results {
		log.Printf("%+v", rel)
	}
}

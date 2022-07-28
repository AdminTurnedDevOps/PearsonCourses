package main

import (
	"fmt"
	"log"
	"os"

	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/chart/loader"
	"helm.sh/helm/v3/pkg/cli"
)

func main() {
	// Pass in the path to the helm chart and the name of the helm chart at runtime
	helmChart := os.Args[1]
	releaseName := os.Args[2]

	// Call upon the CLI package
	settings := cli.New()

	chart, err := loader.Load(helmChart)
	if err != nil {
		log.Println(err)
	}

	// Create a new instance of the configuration
	config := new(action.Configuration)

	// Collect local Helm information
	if err := config.Init(settings.RESTClientGetter(), settings.Namespace(), os.Getenv("HELM_DRIVER"), log.Printf); err != nil {
		log.Printf("%+v", err)
	}

	// Create a new instance of the `Install` action, which is similar to running `helm instll`
	client := action.NewInstall(config)

	// Install a helm chart
	client.ReleaseName = releaseName
	results, err := client.Run(chart, nil)
	if err != nil {
		log.Printf("%+v", err)
	}

	fmt.Println(results)
}

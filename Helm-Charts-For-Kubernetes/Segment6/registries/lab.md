To learn more about chart repos, check out this link: https://helm.sh/docs/topics/chart_repository/


## Create A Helm Chart
You'll need a Helm Chart that can then be turned into a Chart Repository. A Chart Repository is created by generating an Index.yaml file

1. Create a GitHub Repo and clone the repo

2. `cd` into the repo and create a new directory called `charts`

2. `cd` into the `charts directory` and create a new Helm Chart
`helm create nginxtest`

3. Within the `charts` directory (not in the `nginxtest` directory), create an `index.yaml` file
`helm repo index nginxtest`

## GitHub Pages

1. Create a GitHub repo or use the one from the previous lab with Artifact Hub
2. Create a new branch for the repo called `gh-pages`
3. On your repo, go to *Settings* --> *Code and Automation* --> *Pages*

You'll see that your repo is set up as a GitHub Page and there's a specific URL for it up top

[](../images/2.png)

By default Source usually gets set to `gh-pages` branch. If this is not set by default, then select it.

You can use a custom domain there if you wish so.

And check that Enforce HTTPS is ticked, so the HTTPS will be used when charts are served.

In such setup you can use your default branch to store your charts code, and gh-pages branch as charts repository, e.g.: https://USERNAME.github.io/REPONAME.

4. Go to the URL and you can see the `index.yaml` to confirm it's working. For example, mine would be `https://adminturneddevops.github.io/helmrepoexample/charts/index.yaml`
5. Copy the URL on the *Pages* page as you'll need it for the next lab. For example, mine is `https://adminturneddevops.github.io/helmrepoexample/` and I want to add `/charts` to the end of it, so it ends up being `https://adminturneddevops.github.io/helmrepoexample/charts/`

## Artifact Hub

1. Sign up for Artifact Hub [here](https://artifacthub.io/)
2. Once signed in, click on your profile and go to Control Panel
[](../images/1.png)
3. Go to the Repository tab and click on *ADD REPOSITORY*
4. Add in the following information:
- The name of your Helm Chart
- The GitHub path to the Helm Chart

For the GitHub URL, it's going to be the same URL from GitHub pages, except you'll add `/charts/` at the end. So for example, mine is `https://adminturneddevops.github.io/helmrepoexample/charts/`

5. Click the Add button

You should now be able to search for your GitHub repo
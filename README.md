# jfrog-artifactory-badge

> A tiny http based microservice that serves up https://shields.io image badges for given private jfrog artifactory repositories.

## Getting started

- Node 8+
- Copy/rename .env.example file to .env and fill out the details for your artifactory setup
- npm install
- npm start

## Example .env file

You should probably replace servername twice with your jfrog url and may also need to replace the second npm in the path if you didn't call your npm repository 'npm'. The provided user will need read access to the packages that you want to generate badges for.

```
ARTIFACTORY_BADGE_URI=https://servername.jfrog.io/servername/api/npm/npm/
ARTIFACTORY_BADGE_USERNAME=my_jfrog_artifactory_user
ARTIFACTORY_BADGE_PASSWORD=My_jFr0g_4rtifactory_P@ssword!
```

## Deployment

Deployment to zeit's now.sh is pretty easy so it is described here. You may deploy to hosting of your choosing.

```
# Read your .env file and puts those secrets into now.sh, deploys 
# and gives you a https://GENERIC-NOW-URL.now.sh on your clipboard
now --dotenv

# scale it so it doesn't sleep, using the URL they give you
now scale https://GENERIC-NOW-URL.now.sh 1

# If you have a paid account, you can alias to a custom url
now alias http://GENERIC-NOW-URL.now.sh https://mydomain.com

# Now you can use an html img tag
<img src="https://mydomain.com/@scope/package" alt="package version">

# or markdown image
![package version](https://mydomain.com/@scope/package)

```

## Author

2018, jimthedev
MIT License, have fun.
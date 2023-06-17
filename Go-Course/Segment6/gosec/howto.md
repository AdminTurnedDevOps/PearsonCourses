https://github.com/securego/gosec

## Install
```
brew install gosec
```

```
curl -sfL https://raw.githubusercontent.com/securego/gosec/master/install.sh | sh -s -- -b $(go env GOPATH)/bin vX.Y.Z
```

## Use
gosec -tests .
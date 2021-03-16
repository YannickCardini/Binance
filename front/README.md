## Front

Installer les dépendances:
```
npm i
```

Lancer le serveur:
```
npm start
```

## Docker

Build docker image:
```
docker build -t binance-angular .
```

Run docker image:
```
docker run -p 80:80 -d binance-angular
```

Save the image to a tar.gz:
```
docker save binance-angular:latest | gzip > binance-angular.tar.gz
```
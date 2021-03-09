## Back

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
docker build -t binance-node .
```

Run docker image:
```
docker run -p 3000:3000 -d binance-node
```


## Issues

Si vous obtenez l'erreure suivante:
```
Timestamp for this request was 1000ms ahead of the server's time.
```
Il faut aller dans les paramètres de votre système d'exploitation et synchroniser 'date & time' puis relancer le serveur.
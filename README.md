### Build Docker image 
```BASH
docker build --platform linux/amd64 -t storyteller:latest .
```

### Run Docker container 
```BASH
docker run -p 3000:3000 storyteller:latest
```
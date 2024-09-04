# Storyteller 

A web application assists (long) novel writing by using LLMs. 

To write long novels, the storyteller is designed to write content based on the user's ideas. In addition, the storyteller will write with respect to the "context," such as the things characters have done and previous events related to the current one.  

## Usages

### Build Docker image 
```BASH
docker build --platform linux/amd64 -t storyteller:latest .
```

### Run Docker container 
```BASH
docker run -p 3000:3000 storyteller:latest
```
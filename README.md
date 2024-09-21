## Install

```
# Build the image
docker build -t docket:latest .

# Run the container with auto-restart
docker run -d --restart=always --name docket-container docket:latest
```
# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git make

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build agent binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o overseer-agent ./cmd/agent

# Production stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates docker-cli docker-compose

WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/overseer-agent .

# Copy docker socket (will be mounted at runtime)
# Mount /var/run/docker.sock at runtime

EXPOSE 8080

CMD ["./overseer-agent"]

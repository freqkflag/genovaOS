package docker

import (
	"context"

	"github.com/docker/docker/client"
)

type Client struct {
	cli *client.Client
}

func NewClient(socket string) (*Client, error) {
	cli, err := client.NewClientWithOpts(
		client.WithHost("unix://"+socket),
		client.WithAPIVersionNegotiation(),
	)
	if err != nil {
		return nil, err
	}

	return &Client{cli: cli}, nil
}

func (c *Client) Close() error {
	return c.cli.Close()
}

// TODO: Add methods for Compose deployment, log streaming, etc.

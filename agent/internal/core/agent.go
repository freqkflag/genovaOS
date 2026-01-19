package core

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/overseer/agent/internal/config"
	"github.com/overseer/agent/internal/docker"
	"github.com/overseer/agent/internal/heartbeat"
)

type Agent struct {
	config     *config.Config
	docker     *docker.Client
	heartbeat  *heartbeat.Client
	ctx        context.Context
	cancel     context.CancelFunc
}

func NewAgent(cfg *config.Config) (*Agent, error) {
	ctx, cancel := context.WithCancel(context.Background())

	// Initialize Docker client
	dockerClient, err := docker.NewClient(cfg.DockerSocket)
	if err != nil {
		cancel()
		return nil, fmt.Errorf("failed to create Docker client: %w", err)
	}

	// Initialize heartbeat client
	hbClient := heartbeat.NewClient(cfg.CoreURL, cfg.Token)

	return &Agent{
		config:    cfg,
		docker:    dockerClient,
		heartbeat: hbClient,
		ctx:       ctx,
		cancel:    cancel,
	}, nil
}

func (a *Agent) Start() error {
	// Register with core
	if err := a.register(); err != nil {
		return fmt.Errorf("failed to register: %w", err)
	}

	// Start heartbeat loop
	go a.startHeartbeat()

	log.Println("Agent started successfully")
	return nil
}

func (a *Agent) Stop() {
	a.cancel()
	a.docker.Close()
}

func (a *Agent) register() error {
	// TODO: Implement registration with core API
	log.Println("Registering with core...")
	return nil
}

func (a *Agent) startHeartbeat() {
	ticker := time.NewTicker(a.config.HeartbeatInterval)
	defer ticker.Stop()

	for {
		select {
		case <-a.ctx.Done():
			return
		case <-ticker.C:
			if err := a.heartbeat.Send(a.ctx); err != nil {
				log.Printf("Heartbeat failed: %v", err)
			}
		}
	}
}

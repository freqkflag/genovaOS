package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/overseer/agent/internal/config"
	"github.com/overseer/agent/internal/core"
)

var (
	version = "dev"
	commit  = "unknown"
)

func main() {
	var (
		configPath = flag.String("config", "", "Path to config file")
		coreURL    = flag.String("core-url", "", "Overseer Core API URL")
		token      = flag.String("token", "", "Agent authentication token")
		showVersion = flag.Bool("version", false, "Show version and exit")
	)
	flag.Parse()

	if *showVersion {
		fmt.Printf("overseer-agent version %s (commit: %s)\n", version, commit)
		os.Exit(0)
	}

	// Load configuration
	cfg, err := config.Load(*configPath, *coreURL, *token)
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Create agent instance
	agent, err := core.NewAgent(cfg)
	if err != nil {
		log.Fatalf("Failed to create agent: %v", err)
	}

	// Start agent
	if err := agent.Start(); err != nil {
		log.Fatalf("Failed to start agent: %v", err)
	}
	defer agent.Stop()

	log.Printf("Overseer Agent started (version: %s)", version)
	log.Printf("Connected to core: %s", cfg.CoreURL)

	// Handle graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	<-sigChan
	log.Println("Shutting down agent...")
}

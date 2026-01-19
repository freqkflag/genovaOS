package config

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
)

type Config struct {
	CoreURL    string `json:"core_url"`
	Token      string `json:"token"`
	NodeName   string `json:"node_name"`
	NodeID     string `json:"node_id,omitempty"`
	HeartbeatInterval time.Duration `json:"heartbeat_interval"`
	DockerSocket     string `json:"docker_socket"`
	LogLevel         string `json:"log_level"`
}

func Load(configPath, coreURL, token string) (*Config, error) {
	cfg := &Config{
		CoreURL:    coreURL,
		Token:      token,
		NodeName:   getEnvOrDefault("NODE_NAME", "node-1"),
		HeartbeatInterval: 10 * time.Second,
		DockerSocket:      getEnvOrDefault("DOCKER_SOCKET", "/var/run/docker.sock"),
		LogLevel:          getEnvOrDefault("LOG_LEVEL", "info"),
	}

	// Load from file if provided
	if configPath != "" {
		data, err := os.ReadFile(configPath)
		if err != nil {
			return nil, err
		}
		if err := json.Unmarshal(data, cfg); err != nil {
			return nil, err
		}
	}

	// Override with environment variables or flags
	if coreURL != "" {
		cfg.CoreURL = coreURL
	}
	if token != "" {
		cfg.Token = token
	}

	if cfg.CoreURL == "" {
		return nil, fmt.Errorf("core URL is required")
	}
	if cfg.Token == "" {
		return nil, fmt.Errorf("token is required")
	}

	return cfg, nil
}

func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

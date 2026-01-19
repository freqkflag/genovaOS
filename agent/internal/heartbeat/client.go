package heartbeat

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Client struct {
	coreURL string
	token   string
}

type HeartbeatPayload struct {
	NodeID    string    `json:"node_id"`
	Timestamp time.Time `json:"timestamp"`
	Status    string    `json:"status"`
}

func NewClient(coreURL, token string) *Client {
	return &Client{
		coreURL: coreURL,
		token:   token,
	}
}

func (c *Client) Send(ctx context.Context) error {
	payload := HeartbeatPayload{
		NodeID:    "", // Will be set by agent
		Timestamp: time.Now(),
		Status:    "online",
	}

	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", c.coreURL+"/api/nodes/heartbeat", bytes.NewReader(data))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.token)

	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("heartbeat failed: status %d", resp.StatusCode)
	}

	return nil
}

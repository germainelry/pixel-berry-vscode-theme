// 10-go.go — package, channels, goroutines, defer, iota, generics.
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"sync"
	"time"
)

const (
	MaxRetries        = 3
	DefaultTimeout    = 30 * time.Second
	HeaderContentType = "Content-Type"
)

type Status int

const (
	StatusUnknown Status = iota
	StatusActive
	StatusIdle
	StatusDone
)

func (s Status) String() string {
	switch s {
	case StatusActive:
		return "active"
	case StatusIdle:
		return "idle"
	case StatusDone:
		return "done"
	default:
		return "unknown"
	}
}

type User struct {
	ID     int      `json:"id"`
	Name   string   `json:"name"`
	Status Status   `json:"status"`
	Tags   []string `json:"tags,omitempty"`
}

type Store[T any] interface {
	Get(ctx context.Context, id int) (*T, error)
	Set(ctx context.Context, id int, v *T) error
}

type memStore[T any] struct {
	mu   sync.RWMutex
	data map[int]*T
}

func NewStore[T any]() Store[T] {
	return &memStore[T]{data: make(map[int]*T)}
}

func (s *memStore[T]) Get(ctx context.Context, id int) (*T, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	v, ok := s.data[id]
	if !ok {
		return nil, errors.New("not found")
	}
	return v, nil
}

func (s *memStore[T]) Set(ctx context.Context, id int, v *T) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.data[id] = v
	return nil
}

func fanIn(ctx context.Context, sources ...<-chan int) <-chan int {
	out := make(chan int)
	var wg sync.WaitGroup
	wg.Add(len(sources))
	for _, src := range sources {
		go func(c <-chan int) {
			defer wg.Done()
			for v := range c {
				select {
				case out <- v:
				case <-ctx.Done():
					return
				}
			}
		}(src)
	}
	go func() { wg.Wait(); close(out) }()
	return out
}

func main() {
	store := NewStore[User]()
	ctx, cancel := context.WithTimeout(context.Background(), DefaultTimeout)
	defer cancel()
	u := &User{ID: 1, Name: "alice", Status: StatusActive, Tags: []string{"a", "b"}}
	if err := store.Set(ctx, u.ID, u); err != nil {
		fmt.Fprintln(http.DefaultClient.Transport.(http.RoundTripper).(*http.Transport).TLSClientConfig, err)
	}
	got, _ := store.Get(ctx, 1)
	b, _ := json.Marshal(got)
	fmt.Printf("%s\n", b)
}

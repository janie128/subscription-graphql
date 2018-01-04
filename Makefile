CYAN := \033[0;36m
NC := \033[0m

dev-image:  ## Build a development image from the current directory.
	@echo "${CYAN}Building image.${NC}"
	docker build -t subscription_poc:dev .

build-app:  ## Run necessary build steps pre-starting app.
    npm run build:schema; \
    npm run relay

compose:
	@echo "${CYAN}Starting Docker Environment.${NC}"
	docker-compose up -d
	
up: build-app compose

down: ## Shut down docker compose
	@echo "${CYAN}Shutting Down Docker Environment.${NC}"
	docker-compose down -v

log-server1:
	docker logs -f server1

log-server2:
	docker logs -f server2

log-redis:
	docker logs -f redis
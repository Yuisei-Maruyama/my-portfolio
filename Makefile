.PHONY: help install dev build start lint typecheck clean

help: ## Show available commands
	@echo ""
	@echo "  \033[36mmy-portfolio\033[0m"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'
	@echo ""

install: ## Install dependencies
	pnpm install

dev: ## Start development server
	pnpm dev

build: ## Build for production
	pnpm build

start: ## Start production server
	pnpm start

lint: ## Run ESLint
	pnpm lint

typecheck: ## TypeScript type check
	pnpm exec tsc --noEmit

clean: ## Remove build artifacts and dependencies
	rm -rf .next node_modules

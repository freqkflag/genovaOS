# Contributing to Overseer

Thank you for your interest in contributing to Overseer! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/genovaOS.git
   cd genovaOS
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/YOUR_USERNAME/genovaOS.git
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for detailed setup instructions.

### Quick Start

1. Start infrastructure:
   ```bash
   cd deploy
   docker-compose up -d postgres redis
   ```

2. Setup Core API:
   ```bash
   cd core/api
   npm install
   npx prisma migrate dev
   npm run dev
   ```

3. Setup Core Web:
   ```bash
   cd core/web
   npm install
   npm run dev
   ```

## Making Changes

1. **Write clean code** following existing patterns
2. **Add tests** for new features
3. **Update documentation** as needed
4. **Follow the code style**:
   - TypeScript: Use strict mode, follow existing patterns
   - Go: Follow `gofmt` standards
   - Use meaningful commit messages

## Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Example:
```
feat(api): add node registration endpoint

Implements POST /api/nodes/register endpoint with
token-based authentication and node validation.
```

## Pull Request Process

1. **Update your branch** with latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure tests pass**:
   ```bash
   npm test  # For TypeScript/Node.js
   go test ./...  # For Go
   ```

3. **Create a Pull Request** on GitHub
4. **Fill out the PR template** completely
5. **Wait for review** and address feedback

## Code Review Guidelines

- Be respectful and constructive
- Explain your changes clearly
- Respond to feedback promptly
- Keep PRs focused and reasonably sized

## Reporting Issues

- Use GitHub Issues for bug reports and feature requests
- Use the issue templates
- Provide as much detail as possible
- Include steps to reproduce for bugs

## Questions?

- Open a GitHub Discussion
- Check existing documentation in `docs/`
- Review the project roadmap in `PROJECT-DOCS/`

Thank you for contributing! 🎉

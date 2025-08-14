# GitHub Copilot Instructions

## General Behavior
- **Do not do more than you are asked to do.**
  - Copilot should strictly follow the scope of the prompt or task.
  - Avoid adding extra logic, features, or assumptions unless explicitly requested.

## Framework
- **Use Angular version 18.2.5**
  - All frontend code should be compatible with Angular 18.2.5.
  - Prefer Angular best practices for component structure, services, and modules.
  - Use Angular CLI commands and syntax appropriate for this version.

## Code Style
- Follow existing project conventions for indentation, naming, and file organization.
- Keep code modular and readable.
- Avoid unnecessary comments unless clarification is needed.

## Testing
- Include unit tests only if explicitly requested.
- Use Angular’s testing tools (e.g., Jasmine, Karma) when applicable.

## Logging and Error Handling
- Use minimal logging unless specified.
- Handle errors gracefully but do not over-engineer solutions.

## Security
- Avoid exposing sensitive data or hardcoding secrets.
- Follow Angular security guidelines for DOM sanitization and HTTP requests.

